import { and } from "ajv/dist/compile/codegen/index.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("handle-request")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("accpet-request-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      bookId: { type: "number" },
      acceptanceStatus: { type: "boolean"},
      userID: { type: "number" },
    },
    required: ["bookId","acceptanceStatus","userID"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  console.log(Data);
  try{
  const isBookBorrowed = await Database.isBookBorrowed(Data.bookId);
  if(isBookBorrowed) {
    return {
      notification: {
        type: "error",
        message: "Book is not available!",
      },
      error: true,
    };
  }
  else if(Data.acceptance == false) {
    // Reject the request
    await Database.rejectRequest(Data.bookId,Data.userID);
    return {
      notification: {
        type: "success",
        message: "Request Rejected!",
      },
    };
  }
  else if(Data.acceptance == true){
    const isEnrolled = await Database.isStudentEnrolled(Data.userID);
    const numberOfBorrowedBooks = await Database.getNumberOfBooksBorrowedByUser(Data.userID);

    if(!isEnrolled&&numberOfBorrowedBooks>0){
      
      return {
        notification: {
          type: "error",
          message: "User Already has borrowed a book!",
        },
        error: true,
      };
    }
    else if(isEnrolled&&numberOfBorrowedBooks>=5){
      
      return {
        notification: {
          type: "error",
          message: "User Already has borrowed 5 books!",
        },
        error: true,
      };
    }
    else{
      
      // Accept the request
      await Database.acceptRequest(Data.bookId, Data.userID);
      return {
        notification: {
          type: "success",
          message: "Request  Accepted!",
        },
      };

    }

    }
      
    else {
      return {
        notification: {
          type: "error",
          message: "Invalid request!",
        },
        error: true,
      };
    }

  }
  catch (error) {
    let errorObject = {
      notification: {
        type: "error",
        message: "Unexpected error occurred!",
      },
      error: true,
    };
    console.log(error);
    return errorObject;
  }

  
  

  
}

export default command;