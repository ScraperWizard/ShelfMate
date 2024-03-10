abstract class Database {
  state: DatabaseState;
  abstract authenticateUser({ username, password }: { username: string; password: string }): Promise<Object> | null;
  abstract getUserByAccessToken({ accessToken }: { accessToken: string }): Promise<Object> | null;
  abstract generateJsonWebToken({ username }: { username: string }): Promise<Object> | null;
  abstract getAvailableBooks(): Promise<Object> | null;
  abstract getSearchBooks({ search }: { search: string }): Promise<Object> | null;
  abstract addAccessToken({ id, newAccessToken }: { id: string; newAccessToken: string }): Promise<void> | null;
  abstract getUserIdByName({ username }: { username: string }): Promise<number> | null;
  abstract removeAccessTokenByUserId({ id }: { id: number }): Promise<void> | null;
  abstract viewBookByUser({ userId, username, bookName }: { userId: number; username: string; bookName: string }): Promise<void> | null
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
    street_name: string;
    emailAddress: string;
    phoneNum: string;
  }): Promise<void> | null;
  abstract checkUsename({ username }: { username: string }): Promise<Object> | null;
  abstract getRequests(): Promise<Object> | null;
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
  abstract getMeetingRooms(): Promise<object> | null;
  abstract getAllMeetingRooms(): Promise<object> | null;
  abstract addMeetingRoom({
    capacity,
    equipment,
    maintinance_start,
    maintinance_end,
    userID,
    username,
  }: {
    capacity: number;
    equipment: string;
    maintinance_start: Date;
    maintinance_end: Date;
    userID: number;
    username: string;
  }): Promise<void>;
  abstract deleteMeetingRoom({ roomID, userID, username }: { roomID: number; userID: number; username: string }): Promise<void>;
  abstract updateMeetingRoom({
    roomID,
    capacity,
    equipment,
    maintinance_start,
    maintinance_end,
    userID,
    username,
  }: {
    roomID: number;
    capacity: number;
    equipment: string;
    maintinance_start: Date;
    maintinance_end: Date;
    userID: number;
    username: string;
  }): Promise<void>;
  abstract getReservedMeetingRooms(): Promise<object> | null;
  abstract getUnderMaintenanceMeetingRooms(): Promise<object> | null;
  abstract reserveMeetingRoom({ roomID, userID }: { roomID: number; userID: number }): Promise<void>;
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
    username,
  }: {
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
    id: number;
    username: string;
  }): Promise<void>;
  abstract deleteItem({ barcode, id, username }: { barcode: number; id: number; username: string }): Promise<void>;
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
  }: {
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
    id: number;
    username: string;
  }): Promise<void>;
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
    username,
  }: {
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
    edition_num: number;
    editor: string;
    id: number;
    username: string;
  }): Promise<void>;
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
    username,
  }: {
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
    edition_num: number;
    editor: string;
    id: number;
    username: string;
  }): Promise<void>;
  abstract viewAllBookDetails({ barcode }: { barcode: number }): Promise<Object>;
  abstract viewAllMagazineDetails({ barcode }: { barcode: number }): Promise<Object>;
  abstract getItemType({ barcode }: { barcode: number }): Promise<string>;
  abstract viewAllStudnets(): Promise<object> | null;
  abstract viewEnrolledStudents(): Promise<object> | null;
  abstract viewUnEnrolledStudents(): Promise<object> | null;
  abstract isStudentEnrolled(id: number): Promise<boolean>;
  abstract enrollStudent(id: number, initiator: number): Promise<void>;
  abstract getAllUsers(): Promise<object> | null;
  abstract adduser({
    username,
    password,
    firstName,
    lastName,
    city,
    street_name,
    emailAddress,
    phoneNum,
    userType,
    initiator,
    initiatorName,
  }: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    street_name: string;
    emailAddress: string;
    phoneNum: string;
    userType: string;
    initiator: number;
    initiatorName: string;
  }): Promise<void>;
  abstract deactivateUser({ id, initiator, initiatorName }: { id: number; initiator: number; initiatorName: string }): Promise<void>;
  abstract updateUser({
    id,
    username,
    password,
    firstName,
    lastName,
    city,
    street_name,
    emailAddress,
    phoneNum,
    userType,
    initiator,
    initiatorName,
  }: {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    street_name: string;
    emailAddress: string;
    phoneNum: string;
    userType: string;
    initiator: number;
    initiatorName: string;
  }): Promise<void>;
  abstract changePassword({ oldPassword, newPassword, initiator, initiatorName }: { oldPassword: string; newPassword: string; initiator: number; initiatorName: string }): Promise<void>;
  abstract getMyCards({ id }: { id: number }): Promise<Object>;
  abstract dropSearch(): Promise<void>;
  abstract getMyMeetingRooms({ id }: { id: number }): Promise<Object>;
  abstract roomCheckout({ roomID, userID, username }: { roomID: number; userID: number; username: string }): Promise<void>;
  abstract getOverdueBooks(): Promise<Object>;
  abstract roomsSearch({ search }: { search: string }): Promise<Object>;
  abstract getMyInfo({ id }: { id: number }): Promise<Object>;
}

enum DatabaseState {
  CONNECTING,
  CONNECTED,
  ERROR,
}

function createDatabaseObject() {}

export { Database, DatabaseState };
