var UserAccessLevels;
(function (UserAccessLevels) {
    UserAccessLevels[UserAccessLevels["UNAUTHENTICATED"] = 0] = "UNAUTHENTICATED";
    UserAccessLevels[UserAccessLevels["STUDENT"] = 1] = "STUDENT";
    UserAccessLevels[UserAccessLevels["LIBRARIAN"] = 2] = "LIBRARIAN";
    UserAccessLevels[UserAccessLevels["ADMIN"] = 3] = "ADMIN";
})(UserAccessLevels || (UserAccessLevels = {}));
var StaticCommandNames;
(function (StaticCommandNames) {
    StaticCommandNames["NOTIFICATION"] = "show-notification";
})(StaticCommandNames || (StaticCommandNames = {}));
var StaticCommandErrorNames;
(function (StaticCommandErrorNames) {
    StaticCommandErrorNames["INVALID_CLIENT_INCOMING_DATA"] = "INVALID_CLIENT_DATA";
    StaticCommandErrorNames["INVALID_CLIENT_OUTGOING_DATA"] = "INVALID_SERVER_DATA";
    StaticCommandErrorNames["UNAUTHORIZED"] = "USER_NOT_AUTHORIZED";
})(StaticCommandErrorNames || (StaticCommandErrorNames = {}));
export { UserAccessLevels, StaticCommandNames, StaticCommandErrorNames };
//# sourceMappingURL=Context.js.map