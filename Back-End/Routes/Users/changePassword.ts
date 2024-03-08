import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("change-password")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("change-password-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
        oldPassword: { type: "string" },
        newPassword: { type: "string" },
        newpasswordConfirm: { type: "string" },
    },
    required: ["oldPassword", "newPassword", "newpasswordConfirm"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const { oldPassword, newPassword, newpasswordConfirm } = Data;
  const initiatorName = Client.getName();
  const initiator = await Database.getUserIdByName({username:initiatorName});

  try {
    if(newPassword !== newpasswordConfirm){
      return {
        notification: {
          type: "error",
          message: "Passwords do not match!",
        },
        error: true,
      };
    }
    await Database.changePassword({ oldPassword, newPassword,initiator,initiatorName});
    
    return {
      notification: {
        type: "success",
        message: "Password Updated successfully!",
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
    if (error.message === "Old password is incorrect") {
      errorObject.notification.message = "Old password is incorrect!";
    }
    console.log(error);
    console.log(error.message);

    return errorObject
  }
}

export default command;
