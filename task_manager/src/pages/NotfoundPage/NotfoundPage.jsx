import React from "react";

import "./NotfoundPage.scss";
import {NavLink, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import MenuAndHeader from "../../component/MenuAndHeader";

let mapStateToProps = state => {
  return {
    user:state.users.profile.id
  };
};
function Notfound(props) {
  if (!props.user) return <Redirect to={"/login"} />;
  return (
    <div className="not-found">
      <MenuAndHeader/>
      <div className="not-found-content">
        <div className={"not-found-code"}>404</div>
        <div>Страница не найдена, пожалуйста,</div>
        <NavLink to={"/"}>вернитесь на главную страницу</NavLink>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Notfound);
