import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-meeting-rooms")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-meeting-rooms-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database }: CommandExecuteArguments) {
  const meetingRooms: any = await Database.getMeetingRooms();
  return meetingRooms;
}

export default command;