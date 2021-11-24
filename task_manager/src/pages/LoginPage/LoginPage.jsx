import React from "react";
import "./LoginPage.scss";
import Button from "../../component/Button";
import { NavLink, Redirect } from "react-router-dom";
import { ReactComponent as Logo } from "../../svg/t.svg";
import { login } from "../../redux/profile-reducer";
import { connect } from "react-redux";

import { useInput } from "../../component/Validation";
import Validation from "../../component/Validation/Validation";
import Input from "../../component/Input";
import { EmailPattern, PasswordPattern } from "../../component/PatternConst";

let mapStateToProps = state => {
  return {
    user: state.users.profile.id,
    loginMs: state.users.login
  };
};

function LoginPage(props) {
  const emailTest = useInput("", {
    maxLength: 255,
    isEmpty: true,
    isEmail: true
  });
  const passwordTest = useInput("", {
    maxLength: 12,
    minLength: 4,
    isEmpty: true
  });

  const handleSubmit = () => {
    props.login(emailTest.value, passwordTest.value);
  };
  if (props.user) return <Redirect to={"/"} />;
  return (
    <div className="main-page">
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
        <span className={"error-input"}>{props.loginMs}</span>

        <Input
          value={emailTest}
          pattern={EmailPattern}
          type={"email"}
          placeholder={"E-mail"}
        />
        <Validation value={emailTest} maxLength={255} />

        <Input
          value={passwordTest}
          pattern={PasswordPattern}
          type={"password"}
          placeholder={"Пароль"}
        />
        <Validation value={passwordTest} maxLength={12} minLength={4} />
        {passwordTest.inputValid && emailTest.inputValid ? (
          <div
            className="login-form__content-button"
            onClick={() => handleSubmit()}
          >
            <Button text="Войти" type="add-task" color="blue" />
          </div>
        ) : (
          <div className="login-form__content-button">
            <Button text="Войти" type="add-task" color="blue" noActive={true} />
          </div>
        )}

        <div className="login-form__content-txt">
          <div>Забыли пароль?</div>
          <NavLink className={"login-link"} to={"/registration"}>
            Регистрация
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { login })(LoginPage);
