import { StaticCommandNames, StaticCommandErrorNames } from "../../Applications/Commands/Context.js";
import { createValidationService } from "../Validation/Validation.js";
class CommandRouter {
    constructor(Command, Socket, Client, Data, DBRouter) {
        this.Command = Command;
        this.Socket = Socket;
        this.Client = Client;
        this.Data = Data;
        this.ValidationService = createValidationService();
        this.CommandExecutionFunction = Command.getCommand();
        // this.Database = DBRouter.getConnectionForClientType(Client.setAccessLevel());
    }
    route() {
        if (!this.validateIncomingData()) {
            return this.sendErrorMessageToClient(StaticCommandErrorNames.INVALID_CLIENT_INCOMING_DATA);
        }
        if (!this.validateCommandUserAccessLevel()) {
            return this.sendErrorMessageToClient(StaticCommandErrorNames.INVALID_CLIENT_INCOMING_DATA);
        }
        const CommandData = this.executeCommand();
        this.emitNotificationIfCommandRequires(CommandData);
        if (!this.validateOutgoingData(CommandData)) {
            return this.sendErrorMessageToClient(StaticCommandErrorNames.INVALID_CLIENT_OUTGOING_DATA);
        }
        this.Socket.emit(this.Command.getOutgoingChannel(), CommandData);
    }
    validateIncomingData() {
        const incomingParser = this.ValidationService.compile(this.Command.getIncomingValidationSchema());
        return incomingParser(this.Data);
    }
    sendErrorMessageToClient(errorMessage) {
        // TODO log here
        // console.log(``)
        this.Socket.emit(this.Command.getOutgoingChannel(), { error: errorMessage });
        this.Socket.emit(StaticCommandNames.NOTIFICATION, Notification);
    }
    validateCommandUserAccessLevel() {
        return this.Command.getUserAccessLevel() > this.Client.getAccessLevel();
    }
    async executeCommand() {
        return await this.CommandExecutionFunction(this.Data);
    }
    validateOutgoingData(CommandData) {
        const outgoingParser = this.Command.getOutgoingValidationSchema();
        return this.ValidationService.validate(outgoingParser, CommandData);
    }
    emitNotificationIfCommandRequires(CommandData) {
        if (CommandData?.notification) {
            this.Socket.emit(StaticCommandNames.NOTIFICATION, CommandData.notification);
            delete CommandData.notification;
        }
    }
}
export default CommandRouter;
//# sourceMappingURL=Router.js.map