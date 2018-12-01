import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
//import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
//import filterReducer from "./reducers/filterReducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from "./reducers/blogReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  blogs: blogReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
      )
)

export default store;
