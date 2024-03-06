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
    city,
    street_name,
    emailAddress,
    phoneNum,
  }: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    street_name:string,
    emailAddress: string;
    phoneNum: string;
  }): Promise<void> | null;
  abstract checkUsename({ username }: { username: string }): Promise<Object> | null;
  abstract getRequests():Promise <Object> | null;
  abstract returnBook(barcode, borrower): Promise<void>;
  abstract requestItem(barcode: number, borrower: number): Promise<void>;
  abstract getNumberOfBooksBorrowedByUser(id: number): Promise<number>;
  abstract isBookBorrowedByUser(barcode: number, borrower: number): Promise<boolean>;
  abstract isBookBorrowed(barcode: number): Promise<boolean>;
  abstract acceptRequest(barcode: number, borrower: number): Promise<void>;
  abstract rejectRequest(barcode: number, borrower: number): Promise<void>;
  abstract getBooksBorrowedByUserId({ id }: { id: number }): Promise<Object> | null;
  abstract createLog({ event, details, initiator }: { event: string; details: string; initiator: number }): Promise<void>;
  abstract getLogs(): Promise<void>;
  abstract getMeetingRooms(): Promise <object>| null;
  abstract getReservedMeetingRooms(): Promise <object>| null;
  abstract getUnderMaintenanceMeetingRooms(): Promise <object>| null;
  abstract reserveMeetingRoom({roomID,userID}: {roomID:number,userID:number}): Promise<void>;
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
   id,
   username
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
   username:string
  }): Promise <void>;
  abstract deleteItem({barcode,id,username}:{barcode: number,id:number,username:string}): Promise<void>
  abstract updateBook({
    title,
    author,
    barcode,
    language,
    year_of_prod,
    publisher,
    subjects,
    no_of_pages,
    price,
    rack,
    image,
    isbn,
    id,
    username,
  } : {
    title: string;
    author: string;
    barcode: number;
    language: string;
    year_of_prod: number;
    publisher: string;
    subjects: string;
    no_of_pages: number;
    price: number;
    rack: number;
    image: string;
    isbn: string;
    id:number,
    username:string;
  }): Promise <void>;
  abstract addMagazine({
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
    edition_num,
    editor,
    id,
    username
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
    edition_num:number
    editor: string;
    id:number,
    username:string
  }): Promise <void>;
  abstract updateMagazine({
    title,
    author,
    barcode,
    language,
    year_of_prod,
    publisher,
    subjects,
    no_of_pages,
    price,
    rack,
    image,
    edition_num,
    editor,
    id,
    username
  } : {
    title: string;
    author: string;
    barcode: number;
    language: string;
    year_of_prod: number;
    publisher: string;
    subjects: string;
    no_of_pages: number;
    price: number;
    rack: number;
    image: string;
    edition_num:number
    editor: string;
    id:number,
    username:string
  }): Promise <void>;
  abstract viewAllBookDetails({barcode}:{barcode:number}): Promise<Object>;
  abstract viewAllMagazineDetails({barcode}:{barcode:number}): Promise<Object>;
  abstract getItemType({barcode}:{barcode:number}): Promise<string>;
  abstract viewEnrolledStudents(): Promise <object>| null
  abstract isStudentEnrolled(id:number): Promise<boolean>;
  abstract enrollStudent(id:number): Promise<void>;

}

enum DatabaseState {
  CONNECTING,
  CONNECTED,
  ERROR,
}

function createDatabaseObject() {}

export { Database, DatabaseState };
