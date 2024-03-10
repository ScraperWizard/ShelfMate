import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("request-item")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("request-item-response")
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
    const isEnrolled = await Database.isStudentEnrolled(Client.getId());
    const numberOfBorrowedBooks = await Database.getNumberOfBooksBorrowedByUser(Client.getId());

    if(!isEnrolled&&numberOfBorrowedBooks>0){
      return {
        notification: {
          type: "error",
          message: "You have already borrowed a book!",
        },
        error: true,
      };
    }
    else if(isEnrolled&&numberOfBorrowedBooks>=5){
      return {
        notification: {
          type: "error",
          message: "You have already borrowed 5 books!",
        },
        error: true,
      };
    }
    // Check if the book is currently borrowed by the user
    const isBorrowed = await Database.isBookBorrowed(bookId);

    if (!isBorrowed) {
      // Book is borrowed by the user, proceed to return the book
      await Database.requestItem(bookId, Client.getId());
      return {
        notification: {
          type: "success",
          message: "Book Requested Successfully!",
        },
        error: false,
      };
    } else {
      return {
        notification: {
          type: "error",
          message: "You cannot borrow this book!",
        },
        error: true,
      };
    }
  } catch (error) {
    console.error("Error requesting book:", error);
   
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
