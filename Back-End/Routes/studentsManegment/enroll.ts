import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("enrolled-student")
  .setAccessLevel(UserAccessLevels.ADMIN)
  .setOutgoingChannel("enrolled-student-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {userID: { type: "number"} },
    required: ["userID"],
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database,Data,Client }: CommandExecuteArguments) {
    
    try{
        const studentID = Data.userId;
        const initiator = Client.getId();
        if(await Database.isStudentEnrolled(studentID)==true){
            return{
                notification: {
                    type: "error",
                    message: "Student already enrolled!",
                  },
                  error: true,
                }
        }
        await Database.enrollStudent(studentID,initiator);
        return{
            notification: {
                type: "success",
                message: "Student enrolled and card issued successfully!",
              },
              error: false,
        }

    }catch(error){
        console.log(error);
        return{
            notification: {
                type: "error",
                message: "Unexpected error occurred!",
              },
              error: true,
            }
        }
}

export default command;