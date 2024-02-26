import { ServerCommandBuilder } from "../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-logs")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("logs-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database, Client }: CommandExecuteArguments) {
  const books = await Database.getBooksBorrowedByUserId({ id: Client.getId() });
  return books;
}

export default command;