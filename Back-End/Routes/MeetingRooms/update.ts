import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("update-room")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("update-room-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
        roomID: {type: "number"},
        capacity: {type: "number"},
        equipment: {type: "string"},
        maintinance_start: {type: "string"},
        maintinance_end: {type: "string"},
    },
    required: ["roomID","capacity","equipment","maintinance_start","maintinance_end"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const username= Client.getName()
  const userID = await Database.getUserIdByName({username});
  const {roomID,capacity, equipment,maintinance_start, maintinance_end} = Data;
  
  try {
    await Database.updateMeetingRoom({roomID,capacity, equipment,maintinance_start, maintinance_end,userID,username});
    return {
      notification: {
        type: "success",
        message: "Room  Added successfully!",
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
    return errorObject
  }
}

export default command;
