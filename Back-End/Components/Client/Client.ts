import { UserHierarchy } from "../../Applications/Commands/Context.js";

class Client {
    private name: string;
    private socketId: string;
    private accessLevel: UserHierarchy = UserHierarchy.UNAUTHORIZED;

    constructor(socketId: string) {
        this.socketId = socketId;
    }

    getName(): string {
        return this.name;
    }

    getSocketId(): string {
        return this.socketId;
    }

    getAccessLevel(): UserHierarchy {
        return this.accessLevel;
    }

    setName(value: string) {
        this.name = value;
    }

    setAccessLevel(value: UserHierarchy) {
        this.accessLevel = value;
    }
}

export default Client;
