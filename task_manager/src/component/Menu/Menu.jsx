import React from "react";
import "./Menu.scss";

import { ReactComponent as Home } from "../../svg/home.svg";
import { ReactComponent as Project } from "../../svg/project.svg";
import { ReactComponent as User } from "../../svg/user.svg";
import { ReactComponent as Exit } from "../../svg/exit.svg";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/profile-reducer";
let mapStateToProps = () => {
  return {};
};
function Menu(props) {
  return (
    <div>
      <div className="menu">
        <NavLink
          to="/"
          exact={true}
          className="menu__content"
          activeClassName="menu__content-active"
        >
          <div className="menu__content-img">
            <Home />
          </div>
          <div className="menu__content__txt">Главная</div>
        </NavLink>
        <NavLink
          to="/projects"
          className="menu__content"
          activeClassName="menu__content-active"
        >
          <div className="menu__content-img">
            <Project />
          </div>

          <div className="menu__content__txt">Проекты</div>
        </NavLink>
        <NavLink
          to="/settings"
          className="menu__content"
          activeClassName="menu__content-active"
        >
          <div className="menu__content-img">
            <User />
          </div>

          <div className="menu__content__txt">Личный кабинет</div>
        </NavLink>
        <div className="menu__content" onClick={() => props.logout()}>
          <div className="menu__content-img">
            <Exit />
          </div>

          <div className="menu__content__txt">Выйти</div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {
  logout
})(Menu);
