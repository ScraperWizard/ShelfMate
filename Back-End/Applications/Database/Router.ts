import mysql from "mysql2/promise";
import MySqlDB from "./SqlDatabase.js";
import * as DBConnectionConfig from "../../database.env.json" assert { type: "json" };

class DatabaseRouter {
  private DBConnections = {};

  constructor() {
    for (let i = 0; i < DBConnectionConfig["users"].length; i++) {
      this.addDatabaseObject({
        host: DBConnectionConfig["host"],
        database: DBConnectionConfig["dbname"],
        user: DBConnectionConfig["users"][i]["username"],
        password: DBConnectionConfig["users"][i]["password"],
        type: DBConnectionConfig["users"][i]["type"],
        db: new MySqlDB()
      });
    }
  }

  getRoutedDatabaseConnection(userType: string) {
    return this.DBConnections[userType].db;
  }

  addDatabaseObject(object: any): Promise<void> {
    return new Promise((resolve) => {
      mysql
        .createConnection({
          host: object.host,
          user: object.user,
          password: object.password,
          database: object.database,
        })
        .then((DB) => {
          this.DBConnections[object.type] = DB;
        });
    });
  }
}

export default DatabaseRouter;
