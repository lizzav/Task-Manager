import React from "react";
import Button from "../../component/Button";
import { NavLink, Redirect } from "react-router-dom";
import { ReactComponent as Logo } from "../../svg/t.svg";
import { registration } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { useInput } from "../../component/Validation";
import Input from "../../component/Input";
import {
  EmailPattern,
  PasswordPattern,
  UserNamePattern
} from "../../component/PatternConst";
import Validation from "../../component/Validation/Validation";

let mapStateToProps = state => {
  return {
    user: state.users.profile.id,
    registrationMs: state.users.registrationMs
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
  const nameTest = useInput("", {
    maxLength: 50,
    minLength: 2,
    isEmpty: true
  });

  const handleSubmit = () => {
    props.registration(emailTest.value, passwordTest.value, nameTest.value);
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
        <div className="main-page__content-title">Регистрация</div>
        <span className={"error-input"}>{props.registrationMs}</span>

        <Input
          value={nameTest}
          pattern={UserNamePattern}
          type={"name"}
          placeholder={"Имя"}
        />
        <Validation value={nameTest} maxLength={50} minLength={2} />

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

        {passwordTest.inputValid &&
        emailTest.inputValid &&
        nameTest.inputValid ? (
          <div
            className="login-form__content-button"
            onClick={() => handleSubmit()}
          >
            <Button text="Регистрация" type="add-task" color="blue" />
          </div>
        ) : (
          <div className="login-form__content-button">
            <Button
              text="Регистрация"
              type="add-task"
              color="blue"
              noActive={true}
            />
          </div>
        )}

        <div className="login-form__content-txt">
          <div>Забыли пароль?</div>
          <NavLink className={"login-link"} to={"/login"}>
            Авторизация
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { registration })(LoginPage);
