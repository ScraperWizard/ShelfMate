import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-overdue-books")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("get-overdue-books-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database,Client }: CommandExecuteArguments) {
  
  const books: any = await Database.getOverdueBooks();
  return books;
}

export default command;