import React, { useState, useEffect } from "react";
import Button from "../../component/Button";
import { NavLink, Redirect } from "react-router-dom";
import { ReactComponent as Logo } from "../../svg/t.svg";
import { registration } from "../../redux/profile-reducer";
import { connect } from "react-redux";

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onChange = e => {
    setValue(e.target.value);
  };
  const onBlur = e => {
    setDirty(true);
  };
  const deleteValue = () => {
    setValue("");
    setDirty(false);
  };
  return {
    value,
    onChange,
    onBlur,
    ...valid,
    isDirty,
    deleteValue
  };
};

const useValidation = (value, validations) => {
  const [inputValid, setInputValid] = useState(false);
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "isEmail":
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
      }
    }
  }, [value]);
  useEffect(() => {
    if (isEmpty || maxLengthError || minLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, maxLengthError, minLengthError, emailError]);
  return {
    emailError,
    isEmpty,
    minLengthError,
    maxLengthError,
    inputValid
  };
};

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
        <input
          className="modal-project__input  login-form__content-input"
          name="name"
          placeholder={"Имя"}
          type="name"
          onChange={e => nameTest.onChange(e)}
          value={nameTest.value}
          onBlur={e => nameTest.onBlur(e)}
          pattern="([A-Za-zА-Яа-яЁё\D\s0-9]{2,50})"
        />

        {(!nameTest.isDirty ||
          (!nameTest.isEmpty &&
            !nameTest.maxLengthError &&
            !nameTest.minLengthError) ||
          (!nameTest.isDirty && nameTest.isEmpty)) && (
          <span className={"error-input"} />
        )}

        {nameTest.isDirty && nameTest.isEmpty && (
          <div>
            <div className={"error-input"}>Поле не может быть пустым</div>
          </div>
        )}
        {nameTest.isDirty && !nameTest.isEmpty && nameTest.maxLengthError && (
          <div>
            <div className={"error-input"}>
              Поле не может быть больше 50 символов
            </div>
          </div>
        )}
        {nameTest.isDirty &&
          !nameTest.isEmpty &&
          !nameTest.maxLengthError &&
          nameTest.minLengthError && (
            <div>
              <div className={"error-input"}>
                Пароль не может быть меньше 2 символов
              </div>
            </div>
          )}
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
        {passwordTest.inputValid &&
        emailTest.inputValid &&
        nameTest.inputValid ? (
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
          <NavLink className={"login-link"} to={"/login"}>
            Авторизация
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { registration })(LoginPage);
