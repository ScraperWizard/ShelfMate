import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

  //   {
  //     "title": "wa0dijo",
  //     "author": "dwa8udo",
  //     "barcode": 1057,
  //     "language": "wa8dji",
  //     "year_of_prod": 2009,
  //     "publisher": "aiud",
  //     "subjects": "awdo8uh",
  //     "no_of_pages": 20,
  //     "price": 20,
  //     "rack": 20,
  //     "image": "ujadn",
  //     "isbn": "adownj"
  // }

const command = new ServerCommandBuilder("update-book")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("update-book-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
        title: {  type: "string"},
        author: {  type: "string"},
        barcode: {type:"number"},
        language: {  type: "string"},
        year_of_prod: {  type: "number"},
        publisher: {  type: "string"},
        subjects: {  type: "string"},
        no_of_pages: {  type: "number"},
        price: {  type: "number"},
        rack: {  type: "number"},
        image: {  type: "string"},
        isbn: {  type: "string"}
    },
    required: ["title","author","barcode","language","year_of_prod","publisher","subjects","no_of_pages","price","rack","image","isbn"]
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const { title,author,barcode,language,year_of_prod,publisher,subjects,no_of_pages,price,rack,image,isbn } = Data;
  const id = await Database.getUserIdByName({ username: Client.getName() });
  const username= Client.getName()
  try {
    await Database.updateBook({...Data, id, username});
    return {
      notification: {
        type: "success",
        message: "Book  updated successfully!",
      },
      error: false,
    };
    
  } catch (error) {
    let errorObject = {
      notification: {
        type: "error",
        message: "Unexpected error occurred!",
      },
      error: true,
    };

    if (error.message === "type mismatch") {
      errorObject.notification.message = "type mismatch!";
    }
    else if(error.message==="Barcode invalid"){
      errorObject.notification.message = "Barcode invalid";
    }
    console.log(error);
    return errorObject
  }
}

export default command;
