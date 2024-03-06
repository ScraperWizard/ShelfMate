import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-borrowed-books")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-borrowed-books-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database,Client }: CommandExecuteArguments) {
  const id= Client.getId()
  const books: any = await Database.getBooksBorrowedByUserId({id});
  return books;
}

export default command;