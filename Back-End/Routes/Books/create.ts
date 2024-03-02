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

  try {
    await Database.addBook({title,author,language,year_of_prod,publisher,subjects,no_of_pages,price,rack,image,isbn });
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

    return errorObject
  }
}

export default command;
