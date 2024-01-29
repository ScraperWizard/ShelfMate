// import DBJsonEntry from "../../database.env.json" asserts {type: JSON}

abstract class Database {
  state: DatabaseState;
  abstract authenticateUser({ username, password }: { username: string; password: string }): Promise<Object> | null;
  abstract getUserByAccessToken({ accessToken }: { accessToken: string; }): Promise<Object> | null;
  abstract generateJsonWebToken({ username }: { username: string; }): Promise<Object> | null;
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
