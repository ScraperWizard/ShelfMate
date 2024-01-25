import { ServerCommandBuilder } from "../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../Applications/Commands/Context.js";
import { Database } from "Applications/Database/Database.js";
import Client from "../Components/Client/Client.js";

const command = new ServerCommandBuilder("get-books")
  .setAccessLevel(UserAccessLevels.UNAUTHENTICATED)
  .setOutgoingChannel("get-books-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      accessToken: { type: "string" },
    },
    required: ["username", "password"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  // const { accessToken } = data;
  // const result: any = await Database.getUserFromAccessToken(accessToken);
  // const books: any = await Database.getBooksByUser(result.username);
  // return books;
}

export default command;
