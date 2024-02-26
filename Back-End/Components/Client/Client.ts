import { UserAccessLevels } from "../../Applications/Commands/Context.js";

class Client {
  private name: string;
  private socketId: string;
  private accessLevel: UserAccessLevels = UserAccessLevels.UNAUTHENTICATED;
  private id: number;

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

  setId(value: number) {
    this.id = value;
  }

  getId(): number {
    return this.id;
  }

  setAccessLevelByHumanName(userType: string): void {
    const accessLevels = {
      student: 1,
      librarian: 2,
      admin: 3,
    };

    this.accessLevel = accessLevels[userType];
  }
}

export default Client;
