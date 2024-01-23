enum UserHierarchy {
    UNAUTHORIZED = 0,
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

export {
    UserHierarchy,
    Command
}