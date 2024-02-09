import { ServerCommandBuilder } from "../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("borrow-book")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("borrow-book-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      bookId: { type: "number" },
    },
    required: ["bookId"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  // await Database.isBookAvaliable(Data.bookId);

//   return books;
}

export default command;