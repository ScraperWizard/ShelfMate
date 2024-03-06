import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-maintenance-mr")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("get-maintenance-mr")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database }: CommandExecuteArguments) {
  const meetingRooms: any = await Database.getUnderMaintenanceMeetingRooms();
  return meetingRooms;
}

export default command;