import React, { useState, useEffect } from "react";
import "./LoginPage.scss";
import Button from "../../component/Button";
import { NavLink, Redirect } from "react-router-dom";
import { ReactComponent as Logo } from "../../svg/t.svg";
import { login } from "../../redux/profile-reducer";
import { connect } from "react-redux";

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onChange = e => {
    setValue(e.target.value);
  };
  const onBlur = () => {
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
        <div className="main-page__content-title">??????????????????????</div>
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
            <div className={"error-input"}>???????? ???? ?????????? ???????? ????????????</div>
          </div>
        )}
        {emailTest.isDirty && !emailTest.isEmpty && emailTest.maxLengthError && (
          <div>
            <div className={"error-input"}>
              ???????? ???? ?????????? ???????? ???????????? 250 ????????????????
            </div>
          </div>
        )}
        {emailTest.isDirty &&
          !emailTest.isEmpty &&
          !emailTest.maxLengthError &&
          emailTest.emailError && (
            <div>
              <div className={"error-input"}>???????????????????????? ???????????? email</div>
            </div>
          )}
        <input
          className="modal-project__input  login-form__content-input"
          name="password"
          placeholder={"????????????"}
          type="password"
          onChange={e => passwordTest.onChange(e)}
          value={passwordTest.value}
          onBlur={e => passwordTest.onBlur(e)}
          pattern="([A-Za-z??-????-??????\D\s0-9]{4,12})"
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
            <div className={"error-input"}>???????? ???? ?????????? ???????? ????????????</div>
          </div>
        )}
        {passwordTest.isDirty &&
          !passwordTest.isEmpty &&
          passwordTest.maxLengthError && (
            <div>
              <div className={"error-input"}>
                ???????? ???? ?????????? ???????? ???????????? 12 ????????????????
              </div>
            </div>
          )}
        {passwordTest.isDirty &&
          !passwordTest.isEmpty &&
          !passwordTest.maxLengthError &&
          passwordTest.minLengthError && (
            <div>
              <div className={"error-input"}>
                ???????????? ???? ?????????? ???????? ???????????? 4 ????????????????
              </div>
            </div>
          )}
        {passwordTest.inputValid && emailTest.inputValid ? (
          <div
            className="login-form__content-button"
            onClick={() => handleSubmit()}
          >
            <Button text="??????????" type="add-task" color="blue" />
          </div>
        ) : (
          <div className="login-form__content-button">
            <Button text="??????????" type="add-task" color="blue" noActive={true} />
          </div>
        )}

        <div className="login-form__content-txt">
          <div>???????????? ?????????????</div>
          <NavLink className={"login-link"} to={"/registration"}>
            ??????????????????????
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { login })(LoginPage);
