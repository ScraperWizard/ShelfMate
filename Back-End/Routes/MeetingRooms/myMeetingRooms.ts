import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-my-meeting-rooms")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-my-meeting-rooms-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database,Data,Client }: CommandExecuteArguments) {
    const username = Client.getName();
    const id= await Database.getUserIdByName({username});

  const meetingRooms: any = await Database.getMyMeetingRooms({id});
  return meetingRooms;
}

export default command;