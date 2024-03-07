import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-all-meeting-rooms")
  .setAccessLevel(UserAccessLevels.LIBRARIAN)
  .setOutgoingChannel("get-all-meeting-rooms-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database }: CommandExecuteArguments) {
  const meetingRooms: any = await Database.getAllMeetingRooms();
  return meetingRooms;
}

export default command;