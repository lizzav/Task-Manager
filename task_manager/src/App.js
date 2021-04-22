import "./App.css";
import React from "react";
import MainPage from "./pages/MainPage";
import RegistrationPage from "./pages/RegistrationPage";

import { Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import {connect} from "react-redux";
import TasksInProjectPage from "./pages/TasksInProjectPage";

let mapStateToProps = state => {
  return {
    state: state.main,
  };
};

function App(props) {
  return (
      <div className="App">
        {console.log(props.state.tasks)}
        <Route path="/projects" exact render={()=><TasksInProjectPage/>} />
        <Route path={`/projects/:id`} render={()=><TasksInProjectPage props={props.state.tasks}/>}/>
        <Route path="/" exact render={()=><MainPage/>} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/registration" exact component={RegistrationPage} />
      </div>
  );
}

const AppContainer = connect(
  mapStateToProps
)(App);

export default AppContainer;
