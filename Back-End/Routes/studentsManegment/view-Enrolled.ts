import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("view-enrolled-students")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("view-enrolled-students-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database }: CommandExecuteArguments) {
  const students: any = await Database.viewEnrolledStudents();
  return students;
}

export default command;