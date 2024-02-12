import { StaticCommandNames, StaticCommandErrorNames } from "../../Applications/Commands/Context.js";
import { NotificationTypes } from "../../Components/Notification/Notification.js";
import { createValidationService } from "../Validation/Validation.js";
class CommandRouter {
    constructor(Command, Socket, Client, Data, DBRouter) {
        this.Command = Command;
        this.Socket = Socket;
        this.Client = Client;
        this.Data = Data;
        this.ValidationService = createValidationService();
        this.CommandExecutionFunction = Command.getCommand();
        this.Database = DBRouter.getRoutedDatabaseConnection(Client.getAccessLevel().toString());
    }
    async route() {
        if (!this.validateIncomingData()) {
            return this.sendErrorMessageToClient(StaticCommandErrorNames.INVALID_CLIENT_INCOMING_DATA);
        }
        if (this.validateCommandUserAccessLevel()) {
            return this.sendErrorMessageToClient(StaticCommandErrorNames.UNAUTHORIZED);
        }
        const CommandData = await this.executeCommand();
        this.emitNotificationIfCommandRequires(CommandData);
        // if (!this.validateOutgoingData(CommandData)) {
        //   return this.sendErrorMessageToClient(StaticCommandErrorNames.INVALID_CLIENT_OUTGOING_DATA);
        // }
        this.Socket.emit(this.Command.getOutgoingChannel(), CommandData);
    }
    validateIncomingData() {
        console.log(this.Command.getIncomingValidationSchema(), this.Data);
        const incomingDataValidate = this.ValidationService.compile(this.Command.getIncomingValidationSchema());
        return incomingDataValidate(this.Data);
    }
    sendErrorMessageToClient(errorMessage) {
        this.Socket.emit(this.Command.getOutgoingChannel(), { error: errorMessage });
        this.Socket.emit(StaticCommandNames.NOTIFICATION, {
            type: NotificationTypes.ERROR,
            message: errorMessage,
        });
    }
    validateCommandUserAccessLevel() {
        return this.Command.getUserAccessLevel() > this.Client.getAccessLevel();
    }
    async executeCommand() {
        const ExecuteArguments = {
            Client: this.Client,
            Data: this.Data,
            Database: this.Database,
        };
        return await this.CommandExecutionFunction(ExecuteArguments);
    }
    validateOutgoingData(CommandData) {
        return this.ValidationService.validate(this.Command.getOutgoingValidationSchema(), CommandData);
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