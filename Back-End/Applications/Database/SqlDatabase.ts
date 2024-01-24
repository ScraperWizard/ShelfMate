import { Database, DatabaseState } from "./Database.js";
import * as DBConnectionConfig from "../../database.env.json" assert { type: "json" };
import mysql from "mysql2/promise";

class MySqlDB implements Database {
  private DBConnections = {};
  private Host: string;
  private Name: string;
  private Username: string;
  private Password: string;
  private Type: string;

  state: DatabaseState = DatabaseState.CONNECTING;
  constructor() {
    
  }

  connectToDatabase

  getState(): DatabaseState {
    return this.state;
  }

  getRoutedDatabaseConnection(userType: string) {
    return this.DBConnections[userType];
  }

  async authenticateUser(Username: string, Password: string): Promise<Object> {
    const [results] = await this.DBConnection.execute(`SELECT * FROM users WHERE Username=? AND Password=?`, [Username, Password]);

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
