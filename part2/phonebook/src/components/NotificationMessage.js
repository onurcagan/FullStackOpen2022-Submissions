export const NotificationMessage = ({ notificationMessage, errorMessage, setErrorMessage, setNotificationMessage }) => {
  if (!notificationMessage && !errorMessage) {
    return null
  }

  if (errorMessage) {
    return <div className="error">{errorMessage}</div>
  }

  return <div className="notification">{notificationMessage}</div>
}
