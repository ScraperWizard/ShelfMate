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

async function callback(Client: Client, data: any, Database: Database) {
  const { username, password } = data;
  const results = await Database.authenticateUser(username, password);

  if (results == null) {
    return {
      error: "Invalid username or password!",
    };
  }

  Client.setName(results[0].Username);

  return results[0];
}

export default command;
