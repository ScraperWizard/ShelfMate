import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("check-out")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("check-out-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {
        roomId: { type: "number" },
    },required:["roomId"]
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database,Data,Client }: CommandExecuteArguments) {
    const username = Client.getName();
    const userID= await Database.getUserIdByName({username});

  try {
    const roomID = Data.roomId;
    await Database.roomCheckout({roomID,userID,username});
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