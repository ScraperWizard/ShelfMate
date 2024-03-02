abstract class Database {
  state: DatabaseState;
  abstract authenticateUser({ username, password }: { username: string; password: string }): Promise<Object> | null;
  abstract getUserByAccessToken({ accessToken }: { accessToken: string }): Promise<Object> | null;
  abstract generateJsonWebToken({ username }: { username: string }): Promise<Object> | null;
  abstract getAvailableBooks(): Promise<Object> | null;
  abstract addAccessToken({ id, newAccessToken }: { id: string; newAccessToken: string }): Promise<void> | null;
  abstract getUserIdByName({ username }: { username: string }): Promise<number> | null;
  abstract removeAccessTokenByUserId({ id }: { id: number }): Promise<void> | null;
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
  abstract returnBook(barcode, borrower): Promise<void>;
  abstract isBookBorrowedByUser(barcode: number, borrower: number): Promise<boolean>;
  abstract isBookBorrowed(barcode: number): Promise<boolean>;
  abstract borrowBook(barcode: number, borrower: number): Promise<void>;
  abstract getBooksBorrowedByUserId({ id }: { id: number }): Promise<Object> | null;
  abstract createLog({ event, details, initiator }: { event: string; details: string; initiator: number }): Promise<void>;
  abstract getLogs(): Promise<void>;
  abstract getMeetingRooms(): Promise <object>| null;
  abstract addBook({
    title,
    author,
    language,
    year_of_prod,
   publisher,
    subjects,
    no_of_pages,
    price,
    rack,
    image,
   isbn,
   id
  } : {
    title: string;
    author: string;
    language: string;
    year_of_prod: number;
   publisher: string;
    subjects: string;
    no_of_pages: number;
    price: number;
    rack: number;
    image: string;
   isbn: string;
   id:number
  }): Promise <void>;
  abstract deleteItem({barcode,id}:{barcode: number,id:number}): Promise<void>
}

enum DatabaseState {
  CONNECTING,
  CONNECTED,
  ERROR,
}

function createDatabaseObject() {}

export { Database, DatabaseState };
