import { StaticCommandNames, StaticCommandErrorNames } from "../../Applications/Commands/Context.js";
import { NotificationTypes } from "../../Components/Notification/Notification.js";
import { createValidationService } from "../Validation/Validation.js";
const CommandRouter = async (Command, Socket, Client, Data) => {
    const execute = Command.getCommand();
    const validationService = createValidationService();
    console.log(`Received command ${Command.getName()} from client ${getIdentifierClient(Client)}`);
    const incomingParser = validationService.compile(Command.getIncomingValidationSchema());
    if (!incomingParser(Data)) {
        sendErrorMessageToClient(Command, Socket, {
            type: NotificationTypes.ERROR,
            message: StaticCommandErrorNames.INVALID_CLIENT_INCOMING_DATA,
        });
        return console.error(`Invalid incoming content for command ${Command.getName()}!`);
    }
    if (Command.getUserAccessLevel() > Client.getAccessLevel()) {
        sendErrorMessageToClient(Command, Socket, {
            type: NotificationTypes.ERROR,
            message: StaticCommandErrorNames.INVALID_CLIENT_INCOMING_DATA,
        });
        return console.error(`Client ${getIdentifierClient(Client)} is not authorized to execute command ${Command.getName()}!`);
    }
    // Get response of command
    const data = await execute(Client, Data);
    if (data?.notification) {
        Socket.emit(StaticCommandNames.NOTIFICATION, data.notification);
        delete data.notification;
    }
    const outgoingParser = Command.getOutgoingValidationSchema();
    if (!validationService.validate(outgoingParser, data)) {
        sendErrorMessageToClient(Command, Socket, {
            type: NotificationTypes.ERROR,
            message: StaticCommandErrorNames.INVALID_CLIENT_OUTGOING_DATA,
        });
        return console.error(`Invalid outgoing content for command ${Command.getOutgoingChannel()}!`);
    }
    console.log(`Sending command ${Command.getOutgoingChannel()} to client ${getIdentifierClient(Client)}`);
    Socket.emit(Command.getOutgoingChannel(), data);
};
function sendErrorMessageToClient(Command, Socket, Notification) {
    Socket.emit(Command.getOutgoingChannel(), { error: Notification.message });
    Socket.emit(StaticCommandNames.NOTIFICATION, Notification);
}
function getIdentifierClient(Client) {
    return Client.getName() || Client.getSocketId();
}
export default CommandRouter;
//# sourceMappingURL=Router.js.map