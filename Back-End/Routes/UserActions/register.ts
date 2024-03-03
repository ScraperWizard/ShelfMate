import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("register")
  .setAccessLevel(UserAccessLevels.UNAUTHENTICATED)
  .setOutgoingChannel("register-account-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      username: { type: "string" },
      password: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      city: { type: "string" },
      street_name: {type:"string"},
      emailAddress: { type: "string" },
      phoneNum: { type: "string" },
    },
    required: ["username", "password", "firstName", "lastName", "city","street_name", "emailAddress", "phoneNum"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const { username, password, firstName, lastName, city,street_name, emailAddress, phoneNum } = Data;

  try {
    await Database.registerStudent({ username, password, firstName, lastName,city,street_name, emailAddress, phoneNum });
    Client.setName(username);
    return {
      notification: {
        type: "success",
        message: "Account created successfully!",
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
