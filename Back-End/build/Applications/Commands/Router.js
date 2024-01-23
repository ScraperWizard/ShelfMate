// TODO change client type and hierchrys check
const CommandRouter = async (Command, Socket, Client, Data) => {
    const execute = Command.getCommand();
    //   const ajv = new Ajv.default();
    //   console.log(
    //     `Received command ${Command.getName()} from client ${
    //       Client.name || Client.socketId
    //     }`
    //   );
    // Validate incoming data
    //   const incomingParser = ajv.compile(Command.getIncomingParser());
    //   if (incomingParser(Data) == false) {
    //     Socket.emit(Command.getOutgoingChannel(), { error: "INVALID_DATA" });
    //     Socket.emit("show-notification", {
    //       type: "error",
    //       message: "UNEXPECETED_CLIENT_ERROR",
    //     } as Notification);
    //     return console.error(
    //       `Invalid incoming content for command ${Command.getName()}!`
    //     );
    //   }
    if (Command.getUserAccessLevel() > Client.getAccessLevel()) {
        Socket.emit(Command.getOutgoingChannel(), { error: "NOT_AUTHORIZED" });
        // console.log(
        //   Command.getOrganizationHierarchy(),
        //   Client.organizationHierarchy,
        //   Command.getUserHierarchy(),
        //   Client.userHierarchy
        // );
        // return console.error(
        //   `Client ${
        //     Client.name || Client.socketId
        //   } is not authorized to execute command ${Command.getName()}! because of ${
        //     Command.getOrganizationHierarchy() > Client.organizationHierarchy
        //       ? "organization"
        //       : "user"
        //   } hierarchy!}`
        // );
    }
    // Get response of command
    const data = await execute(Client, Data);
    if (data?.notification) {
        Socket.emit("show-notification", data.notification);
        delete data.notification;
    }
    // Validate and send response
    //   const outgoingParser = Command.getOutgoingParser();
    //   if (ajv.validate(outgoingParser, data) == false) {
    //     console.log(data);
    //     Socket.emit(Command.getOutgoingChannel(), { error: "INVALID_DATA" });
    //     Socket.emit("show-notification", {
    //         type: "error",
    //         message: "UNEXPECETED_SERVER_ERROR",
    //       } as Notification);
    //     return console.error(
    //       `Invalid outgoing content for command ${Command.getOutgoingChannel()}!`
    //     );
    //   } else {
    //     console.log(
    //       `Sending command ${Command.getOutgoingChannel()} to client ${
    //         Client.name || Client.socketId
    //       }`
    //     );
    //     Socket.emit(Command.getOutgoingChannel(), data);
    //   }
};
export default CommandRouter;
//# sourceMappingURL=Router.js.map