import React, { useState, useCallback } from "react";
import { ReactComponent as Google } from "../../svg/Google.svg";
import { ReactComponent as Vk } from "../../svg/Vk.svg";
import { ReactComponent as Yandex } from "../../svg/yandex.svg";
import "./LoginPage.scss";
import Button from "../../component/Button";
import { ReactComponent as Lists } from "../../svg/lists.svg";
import { NavLink, Redirect } from "react-router-dom";
import { ReactComponent as Logo } from "../../svg/t.svg";
import Users from "../../component/Users/Users";
import { login } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import {
  addList,
  copyList,
  deleteProject,
  deleteTask,
  isFavourite,
  sendTask,
  updateDescriptionTitle,
  updateList,
  updateStatusTask
} from "../../redux/projects-reducer";

let mapStateToProps = state => {
  return {
    user: state.users.profile.id
  };
};

function LoginPage(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = useCallback(
    event => setLogin(event.target.value),
    []
  );
  const handlePasswordChange = useCallback(
    event => setPassword(event.target.value),
    []
  );

  const handleSubmit = () => {
    props.login(login, password);
  };
  if (props.user) return <Redirect to={"/"} />;
  return (
    <div className="main-page">
      {" "}
      {console.log(props.user)}
      <div className="header">
        <div className="header-logo">
          <NavLink to="/" className="header__title">
            <Logo />
            odo
          </NavLink>
        </div>
      </div>
      <div className="main-page__content login-form__content">
        <div className="main-page__content-title">Авторизация</div>

        <div>
          <input
            className="modal-project__input login-form__content-input"
            placeholder={"E-mail"}
            name="email"
            type="email"
            value={login}
            onChange={handleLoginChange}
          />
          <input
            className="modal-project__input  login-form__content-input"
            name="password"
            placeholder={"Пароль"}
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <div
            className="login-form__content-button"
            onClick={() => handleSubmit()}
          >
            <Button text="Войти" type="add-task" color="blue" />
          </div>
        </div>
        <div className="login-form__content-txt">
          <div>Забыли пароль?</div>
          <div>Регистрация</div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { login })(LoginPage);
