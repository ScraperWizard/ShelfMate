import { UserAccessLevels } from "../../Applications/Commands/Context.js";
class Client {
    constructor(socketId) {
        this.accessLevel = UserAccessLevels.UNAUTHENTICATED;
        this.socketId = socketId;
    }
    getName() {
        return this.name;
    }
    getSocketId() {
        return this.socketId;
    }
    getAccessLevel() {
        return this.accessLevel;
    }
    setName(value) {
        this.name = value;
    }
    setAccessLevel(value) {
        this.accessLevel = value;
    }
    setId(value) {
        this.id = value;
    }
    getId() {
        return this.id;
    }
}
export default Client;
//# sourceMappingURL=Client.js.map