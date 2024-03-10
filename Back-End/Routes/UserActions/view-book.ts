import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
const command = new ServerCommandBuilder("view-book")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("view-book-response")
  .setIncomingValidationSchema({
    type: "object",
    properties: {
      bookId: { type: "string" },
    },
    required: ["bookId"],
    additionalProperties: false,
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Database, Client, Data }: CommandExecuteArguments) {
  const username = Client.getName();
  const bookId = Data.bookId;
  const type = await Database.getItemType({barcode:bookId});
  if(type=='magazine'){
    const magazine = await Database.viewAllMagazineDetails({ barcode: bookId });
    console.log(`User ${username} viewed magazine ${magazine["title"]} with barcode ${bookId}`)
    Database.viewBookByUser({ userId: Client.getId(), username, bookName: magazine["title"] });
    return {};
  }
  else{
    const book = await Database.viewAllBookDetails({ barcode: bookId });

  console.log(`User ${username} viewed book ${book["title"]} with barcode ${bookId}`)

  Database.viewBookByUser({ userId: Client.getId(), username, bookName: book["title"] });

  }
  

  return {};
}

export default command;
