const Notification = ({ message, errorMessage }) => {

  if ((message === null) && (errorMessage===null)) {
    return null
  }

  if (errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  if (message) {
    return (
      <div className="notify">
        {message}
      </div>
    )
  }
}

export default Notification