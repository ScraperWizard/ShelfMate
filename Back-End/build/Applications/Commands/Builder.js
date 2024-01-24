class ServerCommand {
    constructor(builder) {
        this.userHierarchy = builder.accessLevel;
        this.name = builder.name;
        this.execute = builder.execute;
        this.incomingValidationSchema = builder.incomingValidationSchema;
        this.outgoingValidationSchema = builder.outgoingValidationSchema;
        this.outgoingChannel = builder.outgoingChannel;
    }
    getIncomingValidationSchema() {
        return this.incomingValidationSchema;
    }
    getOutgoingValidationSchema() {
        return this.outgoingValidationSchema;
    }
    getUserAccessLevel() {
        return this.userHierarchy;
    }
    getOutgoingChannel() {
        return this.outgoingChannel;
    }
    getName() {
        return this.name;
    }
    getCommand() {
        return this.execute;
    }
}
class ServerCommandBuilder {
    constructor(name) {
        this.name = name;
    }
    setUserHirarchy(hirarchy) {
        this.accessLevel = hirarchy;
        return this;
    }
    setOutgoingChannel(channel) {
        this.outgoingChannel = channel;
        return this;
    }
    setIncomingValidationSchema(parser) {
        this.incomingValidationSchema = parser;
        return this;
    }
    setOutgoingValidationSchema(parser) {
        this.outgoingValidationSchema = parser;
        return this;
    }
    setExecute(execute) {
        this.execute = execute;
        return this;
    }
    build() {
        return new ServerCommand(this);
    }
}
export { ServerCommandBuilder };
//# sourceMappingURL=Builder.js.map