import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("delete-item")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("delete-item-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      barcode: {type: "number"}
    },
    required: ["barcode"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const {barcode} = Data;

  try {
    await Database.deleteItem({barcode});
    return {
      notification: {
        type: "success",
        message: "item deleted successfully!",
      },
      error: false,
    };
  } catch (error) {
    let errorObject = {
      notification: {
        type: "error",
        message: "Unexpected error occurred!",
      },
      error: true,
    };

    return errorObject
  }
}

export default command;
