import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-my-info")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-my-info-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database,Client }: CommandExecuteArguments) {
    
    try {
      const username = Client.getName();
      const id = await Database.getUserIdByName({username});
      const user = await Database.getMyInfo({id});
      return user;
    }
    catch (error) {
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