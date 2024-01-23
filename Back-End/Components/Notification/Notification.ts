type Notification = {
  type: NotificationTypes;
  message: string;
};

enum NotificationTypes {
  ERROR = "error",
  SUCCESS = "success"
}

export { Notification, NotificationTypes };
