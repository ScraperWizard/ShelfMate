abstract class Database {
  state: DatabaseState;
  abstract authenticateUser({ username, password }: { username: string; password: string }): Promise<Object> | null;
  abstract getUserByAccessToken({ accessToken }: { accessToken: string }): Promise<Object> | null;
  abstract generateJsonWebToken({ username }: { username: string }): Promise<Object> | null;
  abstract getAvailableBooks(): Promise<Object> | null;
  abstract addAccessToken({ id, newAccessToken }: { id: string; newAccessToken: string }): Promise<void> | null;
  abstract registerStudent({
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
  }): Promise<void> | null;
  abstract checkUsename({ username }: { username: string }): Promise<Object> | null;
}

enum DatabaseState {
  CONNECTING,
  CONNECTED,
  ERROR,
}

function createDatabaseObject() {}

export { Database, DatabaseState };
