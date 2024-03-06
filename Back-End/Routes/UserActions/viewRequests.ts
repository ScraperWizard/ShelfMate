import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-requests")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("get-requests-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database }: CommandExecuteArguments) {
  const requests: any = await Database.getRequests();
  return requests;
}

export default command;