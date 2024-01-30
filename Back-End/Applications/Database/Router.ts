import mysql from "mysql2/promise";
import MySqlDB from "./SqlDatabase.js";
import DBConnectionConfig from "./database.env.js";

class DatabaseRouter {
  private DBConnections = {};

  constructor() {
    for (let i = 0; i < DBConnectionConfig.users.length; i++) {
      const user = DBConnectionConfig.users[i];
      const newDB = new MySqlDB(DBConnectionConfig.host, DBConnectionConfig.dbname, user.username, user.password, user.type);
      newDB.connectToDatabase();
      this.DBConnections[newDB.getType()] = newDB;
    }
  }

  getRoutedDatabaseConnection(userType: string) {
    return this.DBConnections[userType];
  }
}

export default DatabaseRouter;
