import { ServerCommandBuilder } from "../Applications/Commands/Builder.js";
import { UserAccessLevels } from "../Applications/Commands/Context.js";
import Client from "../Components/Client/Client.js";

const command = new ServerCommandBuilder("authenticate")
  .setAccessLevel(UserAccessLevels.UNAUTHENTICATED)
  .setOutgoingChannel("autheticate-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      username: { type: "string" },
      password: { type: "string" },
      accesstoken: { type: "string" },
    },
    required: ["username", "password"],
  })
  .setOutgoingValidationSchema({})
  .build();

async function callback(Client: Client, data, io, socket, db) {
  const { username, password } = data;

  const [results] = await db.execute(`SELECT * FROM users WHERE Username=? AND Password=?`, [username, password]);

  if (results == null) {
    return {
      error: "Invalid username or password!",
    };
  }

  Client.setName(results[0].Username);

  return results[0];
}

export default command;
