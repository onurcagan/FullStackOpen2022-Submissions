export const NotificationMessage = ({ notificationMessage, errorMessage, setErrorMessage, setNotificationMessage }) => {
  if (notificationMessage === null || errorMessage === null) {
    return null
  }

  if (errorMessage) {
    setTimeout(() => setErrorMessage(''), 3000)
    return <div className="error">{errorMessage}</div>
  }

  setTimeout(() => setNotificationMessage(''), 3000)
  return <div className="notification">{notificationMessage}</div>
}
