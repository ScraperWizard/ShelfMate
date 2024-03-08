import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("check-out")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("check-out-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {
        roomID: { type: "number" },
    },required:["roomID"]
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database,Data,Client }: CommandExecuteArguments) {
    console.log(Data);
    const username = Client.getName();
    const userID= await Database.getUserIdByName({username});

  try {
    const roomID = Data.roomID;
    await Database.roomCheckout({roomID,userID,username});

    return {
        notification: {
        type: "success",
        message: "Room checked out successfully!",
        },
        error: false,
    };
}catch(error){
    console.log(error);
    return {
        notification: {
        type: "error",
        message: "Unexpected error occurred!",
        },
        error: true,
    };
}
}

export default command;