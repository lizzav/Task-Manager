import { combineReducers, createStore } from "redux";
import projectReducer from "./projects-reducer";
import profileReducer from "./profile-reducer";

let reducer = combineReducers({
  main: projectReducer,
  users:profileReducer
});
const store = createStore(reducer);

window.store = store;

export default store;
