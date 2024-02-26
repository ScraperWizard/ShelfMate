import { Database, DatabaseState } from "./Database.js";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { register } from "ts-node";

class MySqlDB implements Database {
  private connection: any;
  private host: string;
  private name: string;
  private username: string;
  private password: string;
  private type: number;

  state: DatabaseState = DatabaseState.CONNECTING;
  constructor(host: string, name: string, username: string, password: string, type: number) {
    this.host = host;
    this.name = name;
    this.username = username;
    this.password = password;
    this.type = type;
  }

  getType(): number {
    return this.type;
  }

  connectToDatabase() {
    mysql
      .createConnection({
        host: this.host,
        user: this.username,
        password: this.password,
        database: this.name,
      })
      .then((DB) => {
        this.connection = DB;
        console.log("connected");
      });
  }

  getState(): DatabaseState {
    return this.state;
  }

  async authenticateUser({ username, password }: { username: string; password: string }): Promise<Object> {
    const results = await this.connection.execute(`SELECT * FROM users WHERE Username=? AND Password=?`, [username, password]);

    if (results[0].length === 0) {
      return false;
    } else {
      return results[0][0];
    }
  }

  async getUserByAccessToken({ accessToken }: { accessToken: string }) {
    const results = await this.connection.execute(`SELECT * FROM access_tokens WHERE token=?`, [accessToken]);

    if (results[0].length === 0) {
      return false;
    } else {
      return results[0][0];
    }
  }

  async generateJsonWebToken({ username }: { username: string }): Promise<Object> | null {
    // await this.connection.execute(`INSERT INTO access_tokens (token) VALUES (?)`, []);
    return null;
  }

  async getAvailableBooks(): Promise<Object> | null {
    const results = await this.connection.execute(`SELECT * FROM book NATURAL JOIN inventory WHERE borrower IS NULL`);

    if (results[0].length === 0) {
      return null;
    } else {
      return results[0];
    }
  }

  async isBookBorrowedByUser(barcode: number, borrower: number): Promise<boolean> {
    const [rows, fields] = await this.connection.execute("SELECT * FROM inventory WHERE barcode = ? AND borrower = ?", [barcode, borrower]);

    return rows.length > 0;
  }

  async isBookBorrowed(barcode: number): Promise<boolean> {
    const [rows] = await this.connection.execute("SELECT * FROM inventory WHERE barcode = ?", [barcode]);

    return rows.length > 0 && rows[0].borrower !== null;
  }

  async returnBook(barcode: number, borrower: number): Promise<void> {
    await this.connection.execute("UPDATE inventory SET borrower = NULL WHERE barcode = ? AND borrower = ?", [barcode, borrower]);
  }

  async borrowBook(barcode: number, borrower: number): Promise<void> {
    await this.connection.execute("UPDATE inventory SET borrower = ? WHERE barcode = ? AND borrower IS NULL", [borrower, barcode]);
  }

  async getBooksBorrowedByUserId({ id }: { id: number }): Promise<Object> | null {
    const results = await this.connection.execute(`SELECT * FROM book NATURAL JOIN inventory WHERE borrower=?`, [id]);

    if (results[0].length === 0) {
      return null;
    } else {
      return results[0];
    }
  }

  async getLogs(): Promise<void> {
    const results = await this.connection.execute(`SELECT * FROM logs`);

    return results[0];
  }

  async addAccessToken({ id, newAccessToken }: { id: string; newAccessToken: string }) {
    await this.connection.execute(`INSERT INTO access_tokens (token, id) VALUES (?,?)`, [newAccessToken, id]);
  }

  async getUserIdByName({ username }: { username: string }): Promise<number> | null {
    const results = await this.connection.execute(`SELECT * FROM users WHERE Username=?`, [username]);

    return results[0][0].id;
  }

  async removeAccessTokenByUserId({ id }: { id: number }) {
    await this.connection.execute(`DELETE FROM access_tokens WHERE id=?`, [id]);
  }

  async registerStudent({
    username,
    password,
    firstName,
    lastName,
    postalAddress,
    emailAddress,
    phoneNum,
  }: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    postalAddress: string;
    emailAddress: string;
    phoneNum: string;
  }): Promise<void> {
    try {
      await this.connection.execute(
        `INSERT INTO users (username, password, first_name, last_name, postal_address, email_address, mobile_number, enrolled, user_type) VALUES (?,?,?,?,?,?,?,0,"student")`,
        [username, password, firstName, lastName, postalAddress, emailAddress, phoneNum]
      );
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new error("Username already exists");
      }

      throw new error(error.message);
    }
  }

  async checkUsename({ username }: { username: string }) {
    const results = await this.connection.execute(`SELECT * FROM users WHERE Username=?`, [username]);

    return results[0].length === 0;
  }

  async createLog({event, details, initiator}: {event:string, details:string, initiator:string}):Promise<void> {
    await this.connection.execute(`INSERT (event,details,initiator) VALUES (?,?,?)`, [event , details, initiator])
  }
}

export default MySqlDB;
