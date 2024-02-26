import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("return-book")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("return-book-response")
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
  try {
    const bookId = Data.bookId;

    // Check if the book is currently borrowed by the user
    const isBorrowed = await Database.isBookBorrowedByUser(bookId, Client.getId());

    if (isBorrowed) {
      // Book is borrowed by the user, proceed to return the book
      await Database.returnBook(bookId, Client.getId());
      return {
        notification: {
          type: "success",
          message: "Book successfully returned",
        },
        error: false,
      };
    } else {
      return {
        notification: {
          type: "error",
          message: "You did not borrow this book!",
        },
        error: true,
      };
    }
  } catch (error) {
    console.error("Error returning book:", error);
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
