import './App.css';
import React from "react";
import Header from "./component/Header"
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";



function App() {
  return (
    <div className="App">
      <Header/>
      <MainPage />

    </div>
  );
}

export default App;
