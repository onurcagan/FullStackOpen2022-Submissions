export const NotificationMessage = ({ notificationMessage }) => {
  if (notificationMessage === null) {
    return null
  }

  return <div className="notification">{notificationMessage}</div>
}
