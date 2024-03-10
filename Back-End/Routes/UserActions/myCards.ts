import Client from "Components/Client/Client.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-cards-books")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-cards-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {
       
    }
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database,Data,Client }: CommandExecuteArguments) {
  const username = Client.getName();
  const id = await Database.getUserIdByName({username});

  const cards: any = await Database.getMyCards({id});
  return cards;
}

export default command;