import Client from "Components/Client/Client.js"
import { Database } from "Applications/Database/Database.js"
enum UserAccessLevels {
    UNAUTHENTICATED = 0,
    STUDENT = 1,
    LIBRARIAN = 2,
    ADMIN = 3
}

interface Command {
    getIncomingValidationSchema: Function,
    getOutgoingValidationSchema: Function,
    getUserAccessLevel: Function,
    getOutgoingChannel: Function,
    getName: Function,
    getCommand: Function
}

enum StaticCommandNames {
    NOTIFICATION = "show-notification",
}

enum StaticCommandErrorNames {
    INVALID_CLIENT_INCOMING_DATA = "INVALID_CLIENT_DATA",
    INVALID_CLIENT_OUTGOING_DATA = "INVALID_SERVER_DATA",
    UNAUTHORIZED = "USER_NOT_AUTHORIZED"
}

type CommandExecuteArguments = {
    Client?: Client,
    Data?: any,
    Database?: Database
}

export {
    UserAccessLevels,
    StaticCommandNames,
    Command,
    StaticCommandErrorNames,
    CommandExecuteArguments
}