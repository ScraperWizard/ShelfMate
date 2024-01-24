import { UserAccessLevels } from "../../Applications/Commands/Context.js";

class Client {
    private name: string;
    private socketId: string;
    private accessLevel: UserAccessLevels = UserAccessLevels.UNAUTHENTICATED;

    constructor(socketId: string) {
        this.socketId = socketId;
    }

    getName(): string {
        return this.name;
    }

    getSocketId(): string {
        return this.socketId;
    }

    getAccessLevel(): UserAccessLevels {
        return this.accessLevel;
    }

    setName(value: string) {
        this.name = value;
    }

    setAccessLevel(value: UserAccessLevels) {
        this.accessLevel = value;
    }
}

export default Client;
