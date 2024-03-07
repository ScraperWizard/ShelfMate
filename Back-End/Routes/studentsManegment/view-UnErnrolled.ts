import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("view-unenrolled-students")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("view-unenrolled-students-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database }: CommandExecuteArguments) {
  const students: any = await Database.viewUnEnrolledStudents();
  return students;
}

export default command;