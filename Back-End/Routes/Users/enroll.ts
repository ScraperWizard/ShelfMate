import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("enroll-student")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("enroll-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  try {
    const id = Data.id;

    // Check if the student is already enrolled
    const isEnrolled = await Database.isStudentEnrolled(id);
    if (isEnrolled) throw new Error("Student is already enrolled!");
    else{
        await Database.enrollStudent(id);
        return {
            notification: {
            type: "success",
            message: "Student successfully enrolled",
            },
            error: false,
        };
    }
    
  } catch (error){

    if(error.message === "Student is already enrolled!") {
        return {
            notification: {
            type: "error",
            message: "Student is already enrolled!",
            },
            error: true,
        };
        }else{
    console.error("Error enrolling student:", error);
    return {
      notification: {
        type: "error",
        message: "Unexpected error occurred!",
      },
      error: true,
    };
  }
}
     
}

export default command;
