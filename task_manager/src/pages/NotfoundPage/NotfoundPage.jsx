import React from "react";

import "./NotfoundPage.scss";
import Header from "../../component/Header";
import { NavLink } from "react-router-dom";

function Notfound() {
  return (
    <div className="not-found">
      <Header />
      <div className="not-found-content">
        <div className={"not-found-code"}>404</div>
        <div>Страница не найдена, пожалуйста,</div>
        <NavLink to={"/"}>вернитесь на главную страницу</NavLink>
      </div>
    </div>
  );
}

export default Notfound;
