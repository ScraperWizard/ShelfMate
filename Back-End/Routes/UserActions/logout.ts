import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";

const command = new ServerCommandBuilder("logout")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("logout-response")
  .setIncomingValidationSchema({})
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Database }: CommandExecuteArguments) {
  const userId = await Database.getUserIdByName({ username: Client.getName() });

  if (userId) {
    await Database.removeAccessTokenByUserId({ id: userId });
    Client.setName("");
    Client.setId(-1);
    Client.setAccessLevel(UserAccessLevels.UNAUTHENTICATED);
  }

  return {
    notification: {
      type: "success",
      message: "Logged out successfully!",
    },
    error: false,
    disconnect: true,
  };
}

export default command;
