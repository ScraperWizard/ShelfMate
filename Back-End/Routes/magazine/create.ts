import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("add-magazine")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("add-magazine-response")
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
        edition_num: {type:"string"},
        editor: {  type: "string"},

    },
    required: ["title","author","language","year_of_prod","publisher","subjects","no_of_pages","price","rack","image","edition_num","editor"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
    console.log(Data);
  const { title,author,language,year_of_prod,publisher,subjects,no_of_pages,price,rack,image,edition_num,editor } = Data;
  const id = await Database.getUserIdByName({ username: Client.getName() });
  const username= Client.getName()
  try {
    await Database.addMagazine({title,author,language,year_of_prod,publisher,subjects,no_of_pages,price,rack,image,edition_num,editor,id,username});
    return {
      notification: {
        type: "success",
        message: "Magazine  Added successfully!",
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

    if (error.message === "magazine already exists") {
      errorObject.notification.message = "Book already exists!";
    }
    
    console.log(error);
    return errorObject
  }
}

export default command;
