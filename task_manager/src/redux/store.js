import { combineReducers, createStore } from "redux";
import projectReducer from "./projects-reducer";
import profileReducer from "./profile-reducer";
import { reducer as formReducer } from "redux-form";

let reducer = combineReducers({
  main: projectReducer,
  users: profileReducer,
  form: formReducer
});
const store = createStore(reducer);

window.store = store;

export default store;
