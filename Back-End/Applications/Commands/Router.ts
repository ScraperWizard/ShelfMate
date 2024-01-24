import { Command, StaticCommandNames, StaticCommandErrorNames } from "../../Applications/Commands/Context.js";
import { Notification, NotificationTypes } from "../../Components/Notification/Notification.js";
import { createValidationService } from "../Validation/Validation.js";
import Client from "../../Components/Client/Client.js";

class CommandRouter {
  private Command: Command;
  private Socket: any;
  private Client: any;
  private Data: any;
  private ValidationService: any;
  private Database: any;
  private CommandExecutionFunction: Function;

  constructor(Command: Command, Socket: any, Client: Client, Data: any, DBRouter: any) {
    this.Command = Command;
    this.Socket = Socket;
    this.Client = Client;
    this.Data = Data;
    this.ValidationService = createValidationService();
    this.CommandExecutionFunction = Command.getCommand();
    this.Database = DBRouter.getRoutedDatabaseConnection(Client.getAccessLevel());
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

  private validateIncomingData(): Boolean {
    const incomingParser = this.ValidationService.compile(this.Command.getIncomingValidationSchema());

    return incomingParser(this.Data);
  }

  private sendErrorMessageToClient(errorMessage: StaticCommandErrorNames) {
    console.log("Sending error message to client: ", errorMessage)
    this.Socket.emit(this.Command.getOutgoingChannel(), { error: errorMessage });
    this.Socket.emit(StaticCommandNames.NOTIFICATION, {
      type: NotificationTypes.ERROR,
      message: errorMessage,
    } as Notification);
  }

  private validateCommandUserAccessLevel(): Boolean {
    return this.Command.getUserAccessLevel() > this.Client.getAccessLevel();
  }

  private async executeCommand(): Promise<Object> {
    return await this.CommandExecutionFunction({
      Client: this.Client,
      Data: this.Data,
      Database: this.Database,
    });
  }

  private validateOutgoingData(CommandData: any): Boolean {
    const outgoingParser = this.Command.getOutgoingValidationSchema();

    return this.ValidationService.validate(outgoingParser, CommandData);
  }

  private emitNotificationIfCommandRequires(CommandData: any) {
    if (CommandData?.notification) {
      this.Socket.emit(StaticCommandNames.NOTIFICATION, CommandData.notification as Notification);
      delete CommandData.notification;
    }
  }
}

export default CommandRouter;
