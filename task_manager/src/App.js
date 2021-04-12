import "./App.css";
import React from "react";
import Header from "./component/Header";
import TasksInProjectPage from "./pages/TasksInProjectPage";

function App() {
  return (
    <div className="App">
      <Header />
      <TasksInProjectPage />
    </div>
  );
}

export default App;
