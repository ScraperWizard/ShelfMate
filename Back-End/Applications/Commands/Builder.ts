import { UserAccessLevels } from "./Context.js";
import { Command } from "./Context.js";

class ServerCommand implements Command {
  private name: string;
  private execute: Function;
  private incomingValidationSchema: object;
  private outgoingValidationSchema: object;
  private outgoingChannel: string;
  private accessLevel: UserAccessLevels;

  constructor(builder: ServerCommandBuilder) {
    this.accessLevel = builder.accessLevel;
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
    return this.accessLevel;
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
  accessLevel: UserAccessLevels;
  name: string;
  execute: Function;
  incomingValidationSchema: object;
  outgoingValidationSchema: object;
  outgoingChannel: string;
  
  constructor(name: string) {
    this.name = name;
  }

  setAccessLevel(accessLevel: UserAccessLevels) {
    this.accessLevel = accessLevel;
    return this;
  }

  setOutgoingChannel(channel: string) {
    this.outgoingChannel = channel;
    return this;
  }

  setIncomingValidationSchema(parser: object) {
    this.incomingValidationSchema = parser;
    return this;
  }

  setOutgoingValidationSchema(parser: object) {
    this.outgoingValidationSchema = parser;
    return this;
  }

  setExecute(execute: Function) {
    this.execute = execute;
    return this;
  }

  build() {
    return new ServerCommand(this);
  }
}

export {
    ServerCommandBuilder
}