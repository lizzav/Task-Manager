import React, { useState, useCallback } from "react";
import "./Header.scss";

import { ReactComponent as Lists } from "../../svg/lists.svg";
import { ReactComponent as Logo } from "../../svg/t.svg";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Users from "../Users";

let mapStateToProps = state => {
  return {
    user: state.users.profile
  };
};
function Header(props) {
  return (
    <div>
      <div className="header">
        <div className="header-logo">
          <Lists />
          <NavLink to="/" className="header__title">
            <Logo />
            odo
          </NavLink>
        </div>

        <div className="header__main">
          <NavLink to="/settings">
            <Users />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Header);
