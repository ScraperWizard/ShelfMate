import { Database, DatabaseState } from "./Database.js";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { register } from "ts-node";
import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";

class MySqlDB implements Database {
  private connection: any;
  private host: string;
  private name: string;
  private username: string;
  private password: string;
  private type: number;

  state: DatabaseState = DatabaseState.CONNECTING;
  constructor(host: string, name: string, username: string, password: string, type: number) {
    this.host = host;
    this.name = name;
    this.username = username;
    this.password = password;
    this.type = type;
  }

  getType(): number {
    return this.type;
  }

  connectToDatabase() {
    mysql
      .createConnection({
        host: this.host,
        user: this.username,
        password: this.password,
        database: this.name,
      })
      .then((DB) => {
        this.connection = DB;
        console.log("connected");
      });
  }

  getState(): DatabaseState {
    return this.state;
  }

  async authenticateUser({ username, password }: { username: string; password: string }): Promise<Object> {
    const results = await this.connection.execute(`SELECT * FROM users WHERE Username=? AND Password=?`, [username, password]);
   
    
    if (results[0].length === 0) {
      return false;
    } else {
      this.createLog({ event: "login", details: `User ${username} logged in`, initiator: results[0][0].id });
      return results[0][0];
    }
  }

  async getUserByAccessToken({ accessToken }: { accessToken: string }) {
    const results = await this.connection.execute(`SELECT * FROM access_tokens WHERE token=?`, [accessToken]);

    if (results[0].length === 0) {
      return false;
    } else {
      return results[0][0];
    }
  }

  async generateJsonWebToken({ username }: { username: string }): Promise<Object> | null {
    // await this.connection.execute(`INSERT INTO access_tokens (token) VALUES (?)`, []);
    return null;
  }

  async getAvailableBooks(): Promise<Object> | null {
    const results = await this.connection.execute(`SELECT * FROM inventory WHERE borrower IS NULL`);

    if (results[0].length === 0) {
      return null;
    } else {
      return results[0]; 
    }
  }
  
  async  getRequests(): Promise<Object> {
    const results = await this.connection.execute(`SELECT r.id,username,userID,barcode,title,image,date FROM requests r  NATURAL JOIN inventory INNER JOIN users on userID=users.id;`);
    return results[0];
  }
  async isBookBorrowedByUser(barcode: number, borrower: number): Promise<boolean> {
    const [rows, fields] = await this.connection.execute("SELECT * FROM inventory WHERE barcode = ? AND borrower = ?", [barcode, borrower]);

    return rows.length > 0;
  }

  async isBookBorrowed(barcode: number): Promise<boolean> {
    const [rows] = await this.connection.execute("SELECT * FROM inventory WHERE barcode = ?", [barcode]);

    return rows.length > 0 && rows[0].borrower !== null;
  }

  async getNumberOfBooksBorrowedByUser(id: number): Promise<number> {
    const result = await this.connection.execute("SELECT COUNT(*) AS num FROM inventory WHERE borrower = ?", [id]);
    const numberOfBooks = result[0][0].num;
    return numberOfBooks;
  }
  

  async requestItem(barcode: number, borrower: number): Promise<void> {
  await this.connection.execute("INSERT INTO requests (barcode, userID,date) VALUES (?,?,?)", [barcode, borrower,new Date()]);
    this.createLog({ event: "request", details: `User ${borrower} requested book ${barcode}`, initiator: borrower });
  }

  async returnBook(barcode: number, borrower: number): Promise<void> {
    await this.connection.execute("UPDATE inventory SET borrower = NULL WHERE barcode = ? AND borrower = ?", [barcode, borrower]);
    this.createLog({ event: "return", details: `User ${borrower} returned book ${barcode}`, initiator: borrower })
  }

  async acceptRequest(barcode: number, borrower: number): Promise<void> {
    await this.connection.execute("UPDATE inventory SET borrower = ? WHERE barcode = ?", [borrower, barcode]);
    this.createLog({ event: "borrow", details: `User ${borrower} borrowed book ${barcode}`, initiator: borrower });
    await this.connection.execute("DELETE FROM requests WHERE barcode = ?", [barcode]);
    console.log("deleted");
  }

  async rejectRequest(barcode: number, borrower: number): Promise<void> {
    await this.connection.execute("DELETE FROM requests WHERE barcode = ? AND userID = ?", [barcode, borrower]);
    this.createLog({ event: "reject", details: `User ${borrower} rejected request for book ${barcode}`, initiator: borrower });
  }

  async getBooksBorrowedByUserId({ id }: { id: number }): Promise<Object> | null {
    const results = await this.connection.execute(`SELECT * FROM inventory WHERE borrower=?`, [id]);

    if (results[0].length === 0) {
      return null;
    } else {
      return results[0];  
    }
  }

  async addBook({
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
    id:number,
    username:string
  }): Promise <void>{
    
    try{
      const barcodeQ= await this.connection.execute(`SELECT max(barcode) AS max FROM inventory;`);
      let barcode=barcodeQ[0][0].max;
      barcode++;
      
      await this.connection.execute(`INSERT INTO inventory ( 
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
       type) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
       [title,
        author,
        barcode,
        language,
        year_of_prod,
        publisher,
        subjects,
        no_of_pages,
        price,
        rack,
        image,"book"]);
        await this.connection.execute(`INSERT INTO book(isbn,barcode) VALUES (${isbn},${barcode})`);
        this.createLog({event:"add book",details:`User ${username} added ${title} book`,initiator:id})
    }catch(error){
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("Book already exists");
      }
      else if(isbn.length>13){
        throw new Error("isbn can't be longer than 13 charecters")
      }
       else throw new Error(error.message);
       console.log(error.message);
       console.log(error)
    }

  }
  async deleteItem({barcode,id,username}:{barcode: number,id:number,username;string}): Promise<void>{
    try{
        
        const typeResult =await this.connection.execute(`SELECT type FROM inventory WHERE barcode=${barcode};`);
        const type=typeResult[0][0].type;
        if(type=='book'){
          await this.connection.execute(`DELETE FROM book WHERE barcode=${barcode}`);
          await this.connection.execute(`DELETE FROM inventory WHERE barcode=${barcode}`);
          this.createLog({event:"delete item",details:`User ${username} deleted ${barcode}`,initiator:id});
        }
        else if(type=="magazine"){
          await this.connection.execute(`DELETE FROM magazine WHERE barcode=${barcode}`);
          await this.connection.execute(`DELETE FROM inventory WHERE barcode=${barcode};`);
          this.createLog({event:"delete item",details:`User ${username} deleted ${barcode}`,initiator:id});
        }
        
    } catch (error){
        throw new Error(error.message)
    }
  }

  async updateBook({
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
  }): Promise <void>{
    const book= await this.connection.execute(`SELECT * FROM inventory WHERE barcode=?`,[barcode]);
    const type =book[0][0].type;
    try{     
      await this.connection.execute(`
      UPDATE inventory
      SET
          title = '${title}',
          author = '${author}',
          language = '${language}',
          year_of_prod = ${year_of_prod},
          publisher = '${publisher}',
          subjects = '${subjects}',
          no_of_pages = ${no_of_pages},
          price = ${price},
          rack = ${rack},
          image = '${image}'
      WHERE
          barcode = ${barcode}
      `);
      await this.connection.execute(`UPDATE book SET isbn=? WHERE barcode=?`,[isbn,barcode]);
      this.createLog({event:"update book",details:`User ${username} updated ${barcode} book`,initiator:id})
    }
    catch(error){
      if(type=="magazine"){
        throw new Error("type mismatch");
      }
      else if(book[0].length===0){
        throw new Error("Barcode invalid");
      }
      else{
        throw new Error(error.message);
      }
      console.log(error.message)
      console.log(error);
    }

  }

  async addMagazine({
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
  }): Promise <void>{
    
    try{
      const barcodeQ= await this.connection.execute(`SELECT max(barcode) AS max FROM inventory;`);
      let barcode=barcodeQ[0][0].max;
      barcode++;
      
      await this.connection.execute(`INSERT INTO inventory ( 
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
       type) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
       [title,
        author,
        barcode,
        language,
        year_of_prod,
        publisher,
        subjects,
        no_of_pages,
        price,
        rack,
        image,"magazine"]);
        await this.connection.execute(`INSERT INTO magazine(barcode, edition_num, editor) VALUES (${barcode},${edition_num},'${editor}')`);
        this.createLog({event:"add Magazine",details:`User ${username} added ${barcode} magazine`,initiator:id})
    }catch(error){
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("magazine already exists");
      }
     
       else throw new Error(error.message);
       console.log(error.message);
       console.log(error)
    }

  }

  async updateMagazine({
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
  }): Promise <void>{

    const magazine= await this.connection.execute(`SELECT * FROM inventory WHERE barcode=${barcode}`);
    const type =magazine[0][0].type;
    try{     
      await this.connection.execute(`
      UPDATE inventory
      SET
          title = '${title}',
          author = '${author}',
          language = '${language}',
          year_of_prod = ${year_of_prod},
          publisher = '${publisher}',
          subjects = '${subjects}',
          no_of_pages = ${no_of_pages},
          price = ${price},
          rack = ${rack},
          image = '${image}'
      WHERE
          barcode = ${barcode}
      `);
      await this.connection.execute(`UPDATE magazine SET edition_num=${edition_num},editor='${editor}' WHERE barcode=${barcode}`);
      this.createLog({event:"update Magazine",details:`User ${username} updated ${barcode} magazine`,initiator:id})
    }
    
    catch(error){
      if(type=="book"){
        throw new Error("type mismatch");
      }
      else if(magazine[0].length===0){
        throw new Error("Barcode invalid");
      }
      else{
        throw new Error(error.message);
      }
      console.log(error.message)
      console.log(error);
    }
  }
  async viewAllBookDetails({barcode}:{barcode:number}): Promise<Object>{
    const results = await this.connection.execute(`SELECT * FROM inventory NATURAL JOIN book WHERE barcode=?`,[barcode]);

    if (results[0].length === 0) {
      return null;
    } else {
      return results[0][0];
    }

  }

  async viewAllMagazineDetails({barcode}:{barcode:number}): Promise<Object>{
    const results = await this.connection.execute(`SELECT * FROM inventory NATURAL JOIN magazine WHERE barcode=?`,[barcode]);

    if (results[0].length === 0) {
      return null;
    } else {
      return results[0][0];
    }
  }

  async getItemType({barcode}:{barcode:number}): Promise<string>{
    const results = await this.connection.execute(`SELECT * FROM inventory WHERE barcode=?`,[barcode]);
    return results[0][0].type;
  }

  async getMeetingRooms(): Promise <object>| null{
    const results = await this.connection.execute(`SELECT * FROM available_meeting_rooms;`);

    if (results[0].length === 0) {
      return null;
    } else {
      return results[0];
    }

  }

  async getReservedMeetingRooms(): Promise <object>| null{
    const results = await this.connection.execute(`SELECT * FROM meeting_rooms  WHERE availablity=0`);

    if (results[0].length === 0) {
      return null;
    } else {
      return results[0];
    }

  }

  async  reserveMeetingRoom({ roomID, userID }: { roomID: number; userID: number; }): Promise<void> {
    await this.connection.execute(`UPDATE meeting_rooms SET availablity=0 Reserver_SID=? WHERE roomID=?`, [userID,roomID]);
    this.createLog({ event: "reserve", details: `User ${userID} reserved room ${roomID}`, initiator: userID });
  }

  async getUnderMaintenanceMeetingRooms(): Promise <object>| null{
    const results = await this.connection.execute(`SELECT * FROM meeting_rooms m WHERE NOW() BETWEEN maintinance_start AND maintinance_end`);

    if (results[0].length === 0) {
      return null;
    } else {
      return results[0];
    }

  }

  async  viewAllStudnets(): Promise<object> | null {
    const results = await this.connection.execute(`SELECT * FROM users WHERE type="student"`);
    if (results[0].length === 0) {
      return null;
    } else {
      return results[0];
    }
  }

  async viewEnrolledStudents(): Promise <object>| null{
    const results = await this.connection.execute(`SELECT * FROM users WHERE enrolled=1 AND type="student"`);
    if (results[0].length === 0) {
      return null;
    } else {
      return results[0];
    }

  }

  async  viewUnEnrolledStudents(): Promise<object> | null{
    const results = await this.connection.execute(`SELECT * FROM users WHERE enrolled=0 AND type="student"`);
    if (results[0].length === 0) {
      return null;
    } else {
      return results[0];
    }
      
  }

  async isStudentEnrolled(id:number): Promise<boolean>{
    const results = await this.connection.execute(`SELECT * FROM users WHERE id=?`,[id]);
    return results[0][0].enrolled;

  }
  async enrollStudent(id:number,initiatorID:number): Promise<void>{
    await this.connection.execute(`UPDATE users SET enrolled=1 WHERE id=?`,[id]);
    await this.connection.execute(`CALL insert_user_cards(?)`,[id]);
    this.createLog({ event: "enroll", details: `User ${initiatorID} enrolled student ${id}`, initiator: initiatorID });
  }

  async getLogs(): Promise<void> {
    const results = await this.connection.execute(`SELECT * FROM Logs`);

    return results[0];
  }

  async addAccessToken({ id, newAccessToken }: { id: string; newAccessToken: string }) {
    await this.connection.execute(`INSERT INTO access_tokens (token, id) VALUES (?,?)`, [newAccessToken, id]);
  }

  async getUserIdByName({ username }: { username: string }): Promise<number> | null {
    const results = await this.connection.execute(`SELECT * FROM users WHERE Username=?`, [username]);

    return results[0][0].id;
  }

  async removeAccessTokenByUserId({ id }: { id: number }) {
    await this.connection.execute(`DELETE FROM access_tokens WHERE id=?`, [id]);
  }

  async registerStudent({
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
  }): Promise<void> {
    try {
        
      await this.connection.execute(
        `INSERT INTO users (username, password, first_name, last_name, email_address, mobile_number, enrolled, user_type) VALUES (?,?,?,?,?,?,?,?)`,
        [username, password, firstName, lastName,emailAddress, phoneNum,0,"student"]
      );

      const userQ =await this.connection.execute(`SELECT id from users WHERE username='${username}'`) 
      const userID=userQ[0][0].id;
      await this.connection.execute(`INSERT INTO Address (City,Street_name,userID) VALUES ('${city}','${street_name}',${userID})`);
      this.createLog({ event: "register", details: `User ${username} registered`, initiator: userID});
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("Username already exists");
      }

      throw new Error(error.message);
    }
  }

  async checkUsename({ username }: { username: string }) {
    const results = await this.connection.execute(`SELECT * FROM users WHERE Username=?`, [username]);

    return results[0].length === 0;
  }

  async createLog({ event, details, initiator }: { event: string; details: string; initiator: number }): Promise<void> {
    await this.connection.execute(`INSERT INTO Logs (event,details,initiator) VALUES (?,?,?)`, [event, details, initiator]);
  }
}

export default MySqlDB;
