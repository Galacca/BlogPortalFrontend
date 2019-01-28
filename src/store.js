import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from "./reducers/blogReducer";
import usersReducer from "./reducers/usersReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  users: usersReducer,
  blogs: blogReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
      )
)

export default store;
