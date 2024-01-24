import { ServerCommandBuilder } from "../Applications/Commands/Builder.js";
import { UserAccessLevels } from "../Applications/Commands/Context.js";
import { Database } from "Applications/Database/Database.js";
import Client from "../Components/Client/Client.js";

const command = new ServerCommandBuilder("authenticate")
  .setAccessLevel(UserAccessLevels.UNAUTHENTICATED)
  .setOutgoingChannel("autheticate-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
    required: ["username", "password"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback(Client: Client, data, Database: Database) {
  const { username, password } = data;
  const result: any = await Database.authenticateUser(username, password);

  if (!result) {
    return {
      notification: {
        type: "error",
        message: "Invalid username or password!",
      },
      error: "Invalid username or password!",
    };
  }

  Client.setName(result.username);

  return result;
}

export default command;
