import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-all-info")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-all-info-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {
        barcode: {type:"number"},
    },required:["barcode"]
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database,Data }: CommandExecuteArguments) {
    try{
        const barcode=Data;
        const type=await Database.getItemType(Data);
        if(type==="book"){
            const item: any = await Database.viewAllBookDetails(Data);
            return item;
        }else if (type === "magazine"){
            const item: any = await Database.viewAllMagazineDetails(Data);
            return item;
        }
        else{
            throw new Error("Invalid barcode");
        }
    }catch(error){
        let errorObject = {
            notification: {
              type: "error",
              message: "Unexpected error occurred!",
            },
            error: true,
          };
      
           if(error.message==="Invalid barcode"){
            errorObject.notification.message = "Barcode invalid";
          }
          console.log(error);
          return errorObject
    }
   
    
}

export default command;