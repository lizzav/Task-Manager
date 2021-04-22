import {combineReducers, createStore} from "redux";
import projectReducer from "./projects-reducer";

let reducer= combineReducers({
  main:projectReducer,
});
const  store=createStore(reducer);

window.store=store;

export default store;