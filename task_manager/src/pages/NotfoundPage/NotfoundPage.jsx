import React from "react";

import "./NotfoundPage.scss";
import Header from "../../component/Header";
import {NavLink, Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToProps = state => {
  return {
    user:state.users.profile.id
  };
};
function Notfound(props) {
  if (!props.user) return <Redirect to={"/login"} />;
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

export default connect(mapStateToProps)(Notfound);
