import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-meeting-rooms")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-meeting-rooms-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: true,
    properties: {
      query: { type: "string" },
    },
    required: [],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database,Data }: CommandExecuteArguments) {
  console.log(Data);
  if(Data==null||Data.query=="") {
    const meetingRooms: any = await Database.getMeetingRooms();
    return meetingRooms;
    }
    else{
      const query = Data.query.toString();
      console.log(query);
      const meetingRooms: any = await Database.roomsSearch({ search: query});
      return meetingRooms[0];

    }
  
}

export default command;