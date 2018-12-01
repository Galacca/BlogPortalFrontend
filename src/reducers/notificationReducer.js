const notificationsAtStart = [
    {
        message: "Welcome, please log in",
        style: "neutral"
    }
]

const initialState = notificationsAtStart;

const notificationReducer = (store = initialState, action) => {
    switch (action.type) {
        case "SUCCESS_NOTIFICATION":
        return Object.assign({}, store, {message : action.message, style : "success"})
        
        case "ERROR_NOTIFICATION":
        return Object.assign({}, store, {message : action.message, style : "error"})
    
        case "CLEAR_NOTIFICATION":
        return Object.assign({}, store, {message : "", style : "neutral"})

        case "INITIALIZE_NOTIFICATION":
        return Object.assign({}, store, {message : "Welcome, please log in", style : "neutral"})

        default:
        return store
  }
};

export const initializeNotification = () => {
    return async (dispatch) => {
      dispatch({
      type: "INITIALIZE_NOTIFICATION",
      })
    };
  };

export const successNotification = (message, timeOutInSeconds) => {
  return async (dispatch) => {
    dispatch({
    type: "SUCCESS_NOTIFICATION",
    message: message,
    })
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
        content: ""
      })
    }, timeOutInSeconds * 1000);      

  };
};

export const errorNotification = (message, timeOutInSeconds) => {
    return async (dispatch) => {
      dispatch({
      type: "ERROR_NOTIFICATION",
      message: message,
      })
      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
          content: "",
        })
      }, timeOutInSeconds * 1000);      
  
    };
  };

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

export default notificationReducer;
