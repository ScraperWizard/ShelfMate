import { StaticCommandNames } from "../../Applications/Commands/Context.js";
import { createValidationService } from "../Validation/Validation.js";
class CommandRouter {
    constructor(Command, Socket, Client, Data) {
        this.Command = Command;
        this.Socket = Socket;
        this.Client = Client;
        this.Data = Data;
        this.ValidationService = createValidationService();
    }
    route() {
    }
    validateIncomingData() {
    }
    validateOutgoingData() {
    }
    getRoutedCommand() {
    }
}
// const CommandRouter = async (Command: Command, Socket: any, Client: Client, Data: any) => {
//   const execute = Command.getCommand();
//   const validationService = createValidationService();
//   console.log(`Received command ${Command.getName()} from client ${getClientIdentifier(Client)}`);
//   const incomingParser = validationService.compile(Command.getIncomingValidationSchema());
//   if (!incomingParser(Data)) {
//     sendErrorMessageToClient(Command, Socket, {
//       type: NotificationTypes.ERROR,
//       message: StaticCommandErrorNames.INVALID_CLIENT_INCOMING_DATA,
//     } as Notification);
//     return console.error(`Invalid incoming content for command ${Command.getName()}!`);
//   }
//   if (Command.getUserAccessLevel() > Client.getAccessLevel()) {
//     sendErrorMessageToClient(Command, Socket, {
//       type: NotificationTypes.ERROR,
//       message: StaticCommandErrorNames.INVALID_CLIENT_INCOMING_DATA,
//     } as Notification);
//     return console.error(`Client ${getClientIdentifier(Client)} is not authorized to execute command ${Command.getName()}!`);
//   }
//   // Get response of command
//   const data = await execute(Client, Data);
//   if (data?.notification) {
//     Socket.emit(StaticCommandNames.NOTIFICATION, data.notification as Notification);
//     delete data.notification;
//   }
//   const outgoingParser = Command.getOutgoingValidationSchema();
//   if (!validationService.validate(outgoingParser, data)) {
//     sendErrorMessageToClient(Command, Socket, {
//       type: NotificationTypes.ERROR,
//       message: StaticCommandErrorNames.INVALID_CLIENT_OUTGOING_DATA,
//     } as Notification);
//     return console.error(`Invalid outgoing content for command ${Command.getOutgoingChannel()}!`);
//   }
//   console.log(`Sending command ${Command.getOutgoingChannel()} to client ${getClientIdentifier(Client)}`);
//   Socket.emit(Command.getOutgoingChannel(), data);
// };
function sendErrorMessageToClient(Command, Socket, Notification) {
    Socket.emit(Command.getOutgoingChannel(), { error: Notification.message });
    Socket.emit(StaticCommandNames.NOTIFICATION, Notification);
}
function getClientIdentifier(Client) {
    return Client.getName() || Client.getSocketId();
}
export default CommandRouter;
//# sourceMappingURL=Router.js.map