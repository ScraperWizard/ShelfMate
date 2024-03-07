import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("remove-room")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("remove-room-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      roomID: {type: "number"},
    },
    required: ["roomID"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
    const username=Client.getName();
    const userID = await Database.getUserIdByName({username});
    const roomID = Data.roomID;
    

  try {
    await Database.deleteMeetingRoom({roomID,userID,username});
    return {
      notification: {
        type: "success",
        message: "Room Removed successfully!",
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
