import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("get-library-books")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("library-books-response")
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
  if(Data==null||Data.query=="") {
  const books: any = await Database.getAvailableBooks();
  return books;
  }
  else{
    const query = Data.query.toString();
    console.log(query);
    const books: any = await Database.getSearchBooks({ search: query});
    return books[0];
  }
}

export default command;


