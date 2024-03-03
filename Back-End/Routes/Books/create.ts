import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("add-book")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("add-book-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
        title: {  type: "string"},
        author: {  type: "string"},
        language: {  type: "string"},
        year_of_prod: {  type: "number"},
        publisher: {  type: "string"},
        subjects: {  type: "string"},
        no_of_pages: {  type: "number"},
        price: {  type: "number"},
        rack: {  type: "number"},
        image: {  type: "string"},
        isbn: {  type: "string"},

    },
    required: ["title","author","language","year_of_prod","publisher","subjects","no_of_pages","price","rack","image","isbn"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const { title,author,language,year_of_prod,publisher,subjects,no_of_pages,price,rack,image,isbn } = Data;
  const id = await Database.getUserIdByName({ username: Client.getName() });
  const username= Client.getName()
  try {
    await Database.addBook({title,author,language,year_of_prod,publisher,subjects,no_of_pages,price,rack,image,isbn,id,username});
    return {
      notification: {
        type: "success",
        message: "Book  Added successfully!",
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

    if (error.message === "Book already exists") {
      errorObject.notification.message = "Book already exists!";
    }
    if(error.message==="isbn can't be longer than 13 charecters"){
      errorObject.notification.message = "ISBN can't be longer than 13 charecters";
    }
    console.log(error);
    return errorObject
  }
}

export default command;
