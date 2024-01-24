var UserHierarchy;
(function (UserHierarchy) {
    UserHierarchy[UserHierarchy["UNAUTHORIZED"] = 0] = "UNAUTHORIZED";
    UserHierarchy[UserHierarchy["STUDENT"] = 1] = "STUDENT";
    UserHierarchy[UserHierarchy["LIBRARIAN"] = 2] = "LIBRARIAN";
    UserHierarchy[UserHierarchy["ADMIN"] = 3] = "ADMIN";
})(UserHierarchy || (UserHierarchy = {}));
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
export { UserHierarchy, StaticCommandNames, StaticCommandErrorNames };
//# sourceMappingURL=Context.js.map