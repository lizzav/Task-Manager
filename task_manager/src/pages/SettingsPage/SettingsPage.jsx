import React, { useEffect, useState } from "react";

import "./SettingsPage.scss";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import { connect } from "react-redux";
import Button from "../../component/Button";
import { updatePassword, updateUser } from "../../redux/profile-reducer";
import { Redirect } from "react-router-dom";
import ModalWindow from "../../component/ModalWindow";
import { minLength } from "../../component/FormAddProject/FormAddProject";

let mapStateToProps = state => {
  return {
    state: state.users.users,
    user: state.users.profile.id,
    updatePasswordMs: state.users.updatePassword,
    updateUsersMs: state.users.updateUsers
  };
};

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

function SettingsPage(props) {
  const userData = props.state.filter(user => user.id === props.user)[0];
  const getUserData = type => {
    switch (type) {
      case "name":
        return userData && userData.name ? userData.name : "";
      case "email":
        return userData && userData.email ? userData.email : "";
      case "about":
        return userData && userData.about ? userData.about : "";
      default:
        return "";
    }
  };
  const [massagePassword, setMassagePassword] = useState(false);
  const [massageUsers, setMassageUsers] = useState(false);
  const nameTest = useInput(getUserData("name"), {
    maxLength: 50,
    isEmpty: true,
    minLength: 2
  });
  const emailTest = useInput(getUserData("email"), {
    maxLength: 255,
    isEmpty: true,
    isEmail: true
  });
  const aboutTest = useInput(getUserData("about"), {
    maxLength: 400
  });
  const passwordOldTest = useInput("", {
    minLength: 4,
    maxLength: 8,
    isEmpty: true
  });
  const passwordNewTest = useInput("", {
    minLength: 4,
    maxLength: 8,
    isEmpty: true
  });
  const savePassword = () => {
    props.updatePassword(
      props.user,
      passwordOldTest.value,
      passwordNewTest.value
    );
    setMassagePassword(true);
    passwordNewTest.deleteValue();
    passwordOldTest.deleteValue();
  };

  if (!props.user) return <Redirect to={"/login"} />;
  return (
    <div className="main-page">
      <div>
        <Header />
        <Menu />
      </div>
      <div className="main-page__content">
        <div className="1">
          <div className=" settings-page__container">
            <div className="main-page__content-title">???????????????? ????????????????????</div>
            <div className="settings-page__container-txt">?????? ????????????????????????</div>
            <input
              className="modal-project__input settings-page__container-input"
              onChange={e => nameTest.onChange(e)}
              value={nameTest.value}
              onBlur={e => nameTest.onBlur(e)}
              pattern="[A-Za-z??-????-??????\D0-9]{1,255}"
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
                <div className={"error-input"}>???????? ???? ?????????? ???????? ????????????</div>
              </div>
            )}
            {nameTest.isDirty && !nameTest.isEmpty && nameTest.maxLengthError && (
              <div>
                <div className={"error-input"}>
                  ???????? ???? ?????????? ???????? ???????????? 50 ????????????????
                </div>
              </div>
            )}
            {nameTest.isDirty && !nameTest.isEmpty && nameTest.minLengthError && (
              <div>
                <div className={"error-input"}>
                  ???????? ???? ?????????? ???????? ???????????? 2 ????????????????
                </div>
              </div>
            )}
            <div className="settings-page__container-txt">
              ?????????? ?????????????????????? ??????????
            </div>
            <input
              className="modal-project__input settings-page__container-input"
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
            {emailTest.isDirty &&
              !emailTest.isEmpty &&
              emailTest.maxLengthError && (
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

            <div className="settings-page__container-txt">?? ????????</div>
            <input
              className="modal-project__input settings-page__container-input"
              onChange={e => aboutTest.onChange(e)}
              value={aboutTest.value}
              onBlur={e => aboutTest.onBlur(e)}
              pattern="[A-Za-z??-????-??????\D\s0-9]{1,400}"
            />
            {!aboutTest.maxLengthError && <span className={"error-input"} />}
            {aboutTest.isDirty && aboutTest.maxLengthError && (
              <div>
                <div className={"error-input"}>
                  ???????? ???? ?????????? ???????? ???????????? 400 ????????????????
                </div>
              </div>
            )}

            {(getUserData("name") !== nameTest.value ||
              getUserData("email") !== emailTest.value ||
              getUserData("about") !== aboutTest.value) &&
            nameTest.inputValid &&
            emailTest.inputValid &&
            !aboutTest.maxLengthError ? (
              <div
                className="settings-page__container-button"
                onClick={() =>
                  props.updateUser(
                    props.user,
                    nameTest.value,
                    emailTest.value,
                    aboutTest.value
                  ) && setMassageUsers(true)
                }
              >
                <Button text="??????????????????" type="add-task" color="blue" />
              </div>
            ) : (
              <div className="settings-page__container-button">
                <Button
                  text="??????????????????"
                  type="add-task"
                  color="blue"
                  noActive={true}
                />
              </div>
            )}
          </div>
          <div className="settings-page__container">
            <div className="main-page__content-title">?????????? ????????????</div>
            <div className="settings-page__container-txt">?????????????? ????????????</div>
            <input
              className="modal-project__input settings-page__container-input"
              type="password"
              onChange={e => passwordOldTest.onChange(e)}
              value={passwordOldTest.value}
              onBlur={e => passwordOldTest.onBlur(e)}
              pattern="[A-Za-z??-????-??????\D0-9]{4,8}"
            />
            {(!passwordOldTest.isDirty ||
              (!passwordOldTest.isEmpty &&
                !passwordOldTest.maxLengthError &&
                !passwordOldTest.minLengthError) ||
              (!passwordOldTest.isDirty && passwordOldTest.isEmpty)) && (
              <span className={"error-input"} />
            )}

            {passwordOldTest.isDirty && passwordOldTest.isEmpty && (
              <div>
                <div className={"error-input"}>???????? ???? ?????????? ???????? ????????????</div>
              </div>
            )}
            {passwordOldTest.isDirty &&
              !passwordOldTest.isEmpty &&
              passwordOldTest.maxLengthError && (
                <div>
                  <div className={"error-input"}>
                    ???????? ???? ?????????? ???????? ???????????? 8 ????????????????
                  </div>
                </div>
              )}
            {passwordOldTest.isDirty &&
              !passwordOldTest.isEmpty &&
              !passwordOldTest.maxLengthError &&
              passwordOldTest.minLengthError && (
                <div>
                  <div className={"error-input"}>
                    ?????????????????????? ???????????? 4 ??????????????
                  </div>
                </div>
              )}
            <div className="settings-page__container-txt">?????????? ????????????</div>
            <input
              className="modal-project__input settings-page__container-input"
              type="password"
              onChange={e => passwordNewTest.onChange(e)}
              value={passwordNewTest.value}
              onBlur={e => passwordNewTest.onBlur(e)}
              pattern="[A-Za-z??-????-??????\D0-9]{4,8}"
            />
            {(!passwordNewTest.isDirty ||
              (!passwordNewTest.isEmpty &&
                !passwordNewTest.maxLengthError &&
                !passwordNewTest.minLengthError) ||
              (!passwordNewTest.isDirty && passwordNewTest.isEmpty)) && (
              <span className={"error-input"} />
            )}
            {passwordNewTest.isDirty && passwordNewTest.isEmpty && (
              <div>
                <div className={"error-input"}>???????? ???? ?????????? ???????? ????????????</div>
              </div>
            )}
            {passwordNewTest.isDirty &&
              !passwordNewTest.isEmpty &&
              passwordNewTest.maxLengthError && (
                <div>
                  <div className={"error-input"}>
                    ???????? ???? ?????????? ???????? ???????????? 8 ????????????????
                  </div>
                </div>
              )}
            {passwordNewTest.isDirty &&
              !passwordNewTest.isEmpty &&
              !passwordNewTest.maxLengthError &&
              passwordNewTest.minLengthError && (
                <div>
                  <div className={"error-input"}>
                    ?????????????????????? ???????????? 4 ??????????????
                  </div>
                </div>
              )}

            {passwordNewTest.inputValid && passwordOldTest.inputValid ? (
              <div
                className="settings-page__container-button"
                onClick={() => savePassword()}
              >
                <Button text="??????????????????" type="add-task" color="blue" />
              </div>
            ) : (
              <div className="settings-page__container-button">
                <Button
                  text="??????????????????"
                  type="add-task"
                  color="blue"
                  noActive={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {massagePassword && (
        <ModalWindow
          active={massagePassword}
          setActive={setMassagePassword}
          txt={props.updatePasswordMs}
        />
      )}
      {massageUsers && (
        <ModalWindow
          active={massageUsers}
          setActive={setMassageUsers}
          txt={props.updateUsersMs}
        />
      )}
    </div>
  );
}

export default connect(mapStateToProps, { updateUser, updatePassword })(
  SettingsPage
);
