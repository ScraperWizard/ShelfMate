import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("update-magazine")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("update-magazine-response")
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
        edition_num: {  type: "number"},
        editor: {  type: "string"},
        

    },
    required: ["title","author","barcode","language","year_of_prod","publisher","subjects","no_of_pages","price","rack","image","edition_num","editor"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
    const { title,author,barcode,language,year_of_prod,publisher,subjects,no_of_pages,price,rack,image,edition_num,editor } = Data;
    const id = await Database.getUserIdByName({ username: Client.getName() });
    const username= Client.getName()
    try {
      await Database.updateMagazine({title,author,barcode,language,year_of_prod,publisher,subjects,no_of_pages,price,rack,image,edition_num,editor,id,username});
      return {
        notification: {
          type: "success",
          message: "Magazine  updated successfully!",
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
