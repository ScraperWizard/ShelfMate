import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import { v4 as uuidv4 } from "uuid";

const command = new ServerCommandBuilder("authenticate")
  .setAccessLevel(UserAccessLevels.UNAUTHENTICATED)
  .setOutgoingChannel("autheticate-response")
  .setIncomingValidationSchema({
    oneOf: [
      {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
        required: ["username", "password"],
        additionalProperties: false,
      },
      {
        type: "object",
        properties: {
          accessToken: { type: "string" },
        },
        required: ["accessToken"],
        additionalProperties: false,
      },
    ],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const { username, password, accessToken } = Data;
  let UserData: any;

  if (Data.accessToken) {
    UserData = await Database.getUserByAccessToken(accessToken);
  } else {
    UserData = await Database.authenticateUser({ username, password });

    if (UserData) {
      const newAccessToken = uuidv4();
      await Database.addAccessToken({ id: UserData.id, newAccessToken });
      UserData.accessToken = newAccessToken;
    }
  }

  if (!UserData) {
    return {
      notification: {
        type: "error",
        message: "Invalid username or password!",
      },
      error: "Invalid username or password!",
    };
  }
  else if(UserData.active==0){
    return {
      notification: {
        type: "error",
        message: "Account is deactivated!",
      },
    };
  }

  Client.setName(UserData.username);
  Client.setId(UserData.id);
  Client.setAccessLevelByHumanName(UserData.user_type);
  console.log(Client.getAccessLevel())
  return UserData;
}

export default command;