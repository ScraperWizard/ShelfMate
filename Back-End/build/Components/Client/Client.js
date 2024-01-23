import { UserHierarchy } from "../../Applications/Commands/Context.js";
class Client {
    constructor(socketId) {
        this.accessLevel = UserHierarchy.UNAUTHORIZED;
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
}
export default Client;
//# sourceMappingURL=Client.js.map