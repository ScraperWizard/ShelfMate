import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("deactivate-user")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("deactivate-user-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      id: {type: "number"},
    },
    required: ["id"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
    console.log(Data, "deactivate Data");
    const initiatorName=Client.getName();
    const initiator = await Database.getUserIdByName({username:initiatorName});
    const id = Data.id;
    

  try {
    const books=await Database.getBooksBorrowedByUserId({id});
    if(books){
        return {
            notification: {
            type: "error",
            message: "User has books borrowed!",
            },
            error: "User has books borrowed!",
        };
        }
        else{           
            console.log({id,initiator,initiatorName},"data for deactivation");
            await Database.deactivateUser({id,initiator,initiatorName});
            return {
            notification: {
                type: "success",
                message: "Account Deactivated successfully!",
                },
            error: false,
            };
        }
    
  } catch (error) {
    let errorObject = {
      notification: {
        type: "error",
        message: "Unexpected error occurred!",
      },
      error: true,
    };
    console.log(error);
    return errorObject
  }
}

export default command;
