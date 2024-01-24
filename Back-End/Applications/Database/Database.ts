// import DBJsonEntry from "../../database.env.json" asserts {type: JSON}

abstract class Database {
  state: DatabaseState;
  abstract authenticateUser(Username: string, Password: string): Promise<Object> | null;
  abstract getAvailableBooks(): Promise<Object> | null;
}

enum DatabaseState {
  CONNECTING,
  CONNECTED,
  ERROR,
}

function createDatabaseObject() {

}

export { Database, DatabaseState };
