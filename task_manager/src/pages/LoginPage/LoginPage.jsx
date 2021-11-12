import React from "react";
import "./LoginPage.scss";
import Button from "../../component/Button";
import { NavLink, Redirect } from "react-router-dom";
import { ReactComponent as Logo } from "../../svg/t.svg";
import { login } from "../../redux/profile-reducer";
import { connect } from "react-redux";

import { useInput } from "../../component/Validation";

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
        <input
          className="modal-project__input login-form__content-input"
          placeholder={"E-mail"}
          type="email"
          onChange={e => emailTest.onChange(e)}
          value={emailTest.value}
          onBlur={e => emailTest.onBlur(e)}
          pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,})([.]{1})([A-z]{2,8})"
        />
        {(!emailTest.isDirty ||
          (!emailTest.isEmpty &&
            !emailTest.maxLengthError &&
            !emailTest.emailError) ||
          (!emailTest.isDirty && emailTest.isEmpty)) && (
          <span className={"error-input"} />
        )}

        {emailTest.isDirty && emailTest.isEmpty && (
          <div>
            <div className={"error-input"}>Поле не может быть пустым</div>
          </div>
        )}
        {emailTest.isDirty && !emailTest.isEmpty && emailTest.maxLengthError && (
          <div>
            <div className={"error-input"}>
              Поле не может быть больше 250 символов
            </div>
          </div>
        )}
        {emailTest.isDirty &&
          !emailTest.isEmpty &&
          !emailTest.maxLengthError &&
          emailTest.emailError && (
            <div>
              <div className={"error-input"}>Неправильный формат email</div>
            </div>
          )}
        <input
          className="modal-project__input  login-form__content-input"
          name="password"
          placeholder={"Пароль"}
          type="password"
          onChange={e => passwordTest.onChange(e)}
          value={passwordTest.value}
          onBlur={e => passwordTest.onBlur(e)}
          pattern="([A-Za-zА-Яа-яЁё\D\s0-9]{4,12})"
        />
        {(!passwordTest.isDirty ||
          (!passwordTest.isEmpty &&
            !passwordTest.maxLengthError &&
            !passwordTest.minLengthError) ||
          (!passwordTest.isDirty && passwordTest.isEmpty)) && (
          <span className={"error-input"} />
        )}

        {passwordTest.isDirty && passwordTest.isEmpty && (
          <div>
            <div className={"error-input"}>Поле не может быть пустым</div>
          </div>
        )}
        {passwordTest.isDirty &&
          !passwordTest.isEmpty &&
          passwordTest.maxLengthError && (
            <div>
              <div className={"error-input"}>
                Поле не может быть больше 12 символов
              </div>
            </div>
          )}
        {passwordTest.isDirty &&
          !passwordTest.isEmpty &&
          !passwordTest.maxLengthError &&
          passwordTest.minLengthError && (
            <div>
              <div className={"error-input"}>
                Пароль не может быть меньше 4 символов
              </div>
            </div>
          )}
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
