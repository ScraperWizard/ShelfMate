import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("handle-request")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("accpet-request-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      bookId: { type: "number" },
      acceptanceStatus: { type: "boolean"}
    },
    required: ["bookId","acceptanceStatus"],
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
  else if(Data.acceptanceStatus === false) {
    // Reject the request
    await Database.rejectRequest(Data.bookId, Client.getId());
    return {
      notification: {
        type: "success",
        message: "Request Rejected!",
      },
    };
  }
  else{
      // Accept the request
      await Database.acceptRequest(Data.bookId, Client.getId());

      return {
        notification: {
          type: "success",
          message: "Request  Accepted!",
        },
      };

    }
  

  
}

export default command;