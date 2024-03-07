import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("search-books")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("search-books-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {
        search: { type: "string" },
    },
    
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database }: CommandExecuteArguments) {
  const books: any = await Database.getAvailableBooks();
  return books;
}

export default command;