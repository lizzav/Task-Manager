import "./App.css";
import React from "react";
import MainPage from "./pages/MainPage";
import RegistrationPage from "./pages/RegistrationPage";

import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { connect } from "react-redux";
import TasksInProjectPage from "./pages/TasksInProjectPage";
import ProjectPage from "./pages/ProjectPage";
import SettingsPage from "./pages/SettingsPage";
import Notfound from "./pages/NotfoundPage";

let mapStateToProps = state => {
  return {
    state: state.main
  };
};

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route path="/projects" exact render={() => <ProjectPage />} />
        <Route
          path={`/projects/:id`}
          exact
          render={() => <TasksInProjectPage props={props.state.tasks} />}
        />
        <Route path="/" exact render={() => <MainPage />} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/registration" exact component={RegistrationPage} />
        <Route path="/settings" exact component={SettingsPage} />
        <Route component={Notfound} />
      </Switch>
    </div>
  );
}

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
