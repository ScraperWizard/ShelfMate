import { Database, DatabaseState } from "./Database.js";
import * as DBConnectionConfig from "../../database.env.json" assert { type: "json" };
import mysql from "mysql2/promise";

class MySqlDB implements Database {
  private connection: any;
  private host: string;
  private name: string;
  private username: string;
  private password: string;
  private type: string;

  state: DatabaseState = DatabaseState.CONNECTING;
  constructor(host: string, name: string, username: string, password: string, type: string) {
    this.host = host;
    this.name = name;
    this.username = username;
    this.password = password;
    this.type = type;
  }

  getType(): string {
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

  async authenticateUser(Username: string, Password: string): Promise<Object> {
    const [results] = await this.connection.execute(`SELECT * FROM users WHERE Username=? AND Password=?`, [Username, Password]);

    if (results == null) {
      return {
        error: "Invalid username or password!",
      };
    } else {
      return results[0];
    }
  }

  async getAvailableBooks(): Promise<Object> | null {
    return null;
  }
}

export default MySqlDB;
