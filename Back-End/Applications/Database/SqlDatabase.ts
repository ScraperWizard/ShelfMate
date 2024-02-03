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
    const results = await this.connection.execute(`SELECT * FROM accesstokens WHERE AccessToken=?`, [accessToken]);

    if (results[0].length === 0) {
      return false;
    } else {
      return results[0][0];
    }
  }

  async generateJsonWebToken({ username }: { username: string }): Promise<Object> | null {
    await this.connection.execute(`INSERT INTO accesstokens (accesstoken) VALUES (?)`, []);
    return null;
  }

  async getAvailableBooks(): Promise<Object> | null {
    return null;
  }

  async getUserFromAccessToken() {}

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
}

export default MySqlDB;
