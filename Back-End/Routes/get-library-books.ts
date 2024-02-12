import { ServerCommandBuilder } from "../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-library-books")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("library-books-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database }: CommandExecuteArguments) {
  const books: any = await Database.getAvailableBooks();
  return books;
}

export default command;
