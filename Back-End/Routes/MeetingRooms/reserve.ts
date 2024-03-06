import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("reserve-meeting-rooms")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("reserve-meeting-rooms-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {
        roomID: {type:"number"},
    },required:["roomID"]
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({Client,Database,Data}: CommandExecuteArguments) {
  try{
    const roomID=Data.roomID;
    const userID=Client.getId();
    const result=await Database.reserveMeetingRoom({roomID,userID});
    return {
        notification: {
          type: "success",
          message: "Room Successfuly Reserved!",
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
    console.log(error);
    return errorObject;
  }
    
  
}

export default command;