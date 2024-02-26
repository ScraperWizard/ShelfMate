import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
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
  const isBookAvailable = await Database.isBookBorrowed(Data.isBookBorrowed);

  if(!isBookAvailable) {
    return {
      notification: {
        type: "error",
        message: "Book is not available!",
      },
      error: true,
    };
  }

  await Database.borrowBook(Data.bookId, Client.getId());

  return {
    notification: {
      type: "success",
      message: "Book is borrowed!",
    },
  };
}

export default command;