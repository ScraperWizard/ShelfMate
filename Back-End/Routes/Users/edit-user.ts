import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("update-user")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("update-user-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      id: { type: "number" },
      username: { type: "string" },
      password: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      city: { type: "string" },
      street_name: {type:"string"},
      emailAddress: { type: "string" },
      phoneNum: { type: "string" },
      userType: { type: "string" },
    },
    required: ["id","username", "password", "firstName", "lastName", "city","street_name", "emailAddress", "phoneNum"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const { id,username, password, firstName, lastName, city,street_name, emailAddress, phoneNum,userType} = Data;
  const initiatorName = Client.getName();
  const initiator = await Database.getUserIdByName({username:initiatorName});

  try {
    await Database.updateUser({ id,username, password, firstName, lastName,city,street_name, emailAddress, phoneNum,userType,initiator,initiatorName });
    return {
      notification: {
        type: "success",
        message: "Account Updated successfully!",
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

    if (error.message === "Username already exists") {
      errorObject.notification.message = "Username already exists!";
    }

    console.log(error);
    console.log(error.message);

    return errorObject
  }
}

export default command;
