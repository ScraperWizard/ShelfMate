import { Database, DatabaseState } from "./Database.js";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";

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
    return null
  }

  async getAvailableBooks(): Promise<Object> | null {
    return null;
  }

  async getUserFromAccessToken() {}
}

export default MySqlDB;
