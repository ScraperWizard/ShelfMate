import mysql from "mysql2/promise";
import MySqlDB from "./SqlDatabase.js";
import * as DBConnectionConfig from "../../database.env.json" assert { type: "json" };

class DatabaseRouter {
  private DBConnections = {};

  constructor() {
    for (let i = 0; i < DBConnectionConfig.default.users.length; i++) {
      const user = DBConnectionConfig.default.users[i];
      const newDB = new MySqlDB(DBConnectionConfig.default["host"], DBConnectionConfig.default["dbname"], user.username, user.password, user.type);
      newDB.connectToDatabase();
      this.DBConnections[newDB.getType()] = newDB;
    }
  }

  getRoutedDatabaseConnection(userType: string) {
    return this.DBConnections[userType];
  }
}

export default DatabaseRouter;
