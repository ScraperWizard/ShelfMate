import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("add-room")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("add-room-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
        //capacity, equipment,maintinance_start, maintinance_end
        capacity: {type: "number"},
        equipment: {type: "string"},
        maintinance_start: {type: "string"},
        maintinance_end: {type: "string"},
        
    },
    required: ["capacity","equipment","maintinance_start","maintinance_end"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  console.log(Data);

  const username= Client.getName()
  const userID = await Database.getUserIdByName({username});
  const {capacity, equipment,maintinance_start, maintinance_end} = Data;
  
  try {
    await Database.addMeetingRoom({capacity, equipment,maintinance_start, maintinance_end,userID,username});
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
    console.log(Data);
    console.log(error);
    return errorObject
  }
}

export default command;
