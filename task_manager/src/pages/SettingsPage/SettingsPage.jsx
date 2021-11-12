import React, { useState } from "react";

import "./SettingsPage.scss";
import { connect } from "react-redux";
import Button from "../../component/Button";
import { updatePassword, updateUser } from "../../redux/profile-reducer";
import { Redirect } from "react-router-dom";
import ModalWindow from "../../component/ModalWindow";
import { useInput } from "../../component/Validation";
import MenuAndHeader from "../../component/MenuAndHeader";

let mapStateToProps = state => {
  return {
    state: state.users.users,
    user: state.users.profile.id,
    updatePasswordMs: state.users.updatePassword,
    updateUsersMs: state.users.updateUsers
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
      <MenuAndHeader />
      <div className="main-page__content">
        <div className="1">
          <div className=" settings-page__container">
            <div className="main-page__content-title">Основная информация</div>
            <div className="settings-page__container-txt">Имя пользователя</div>
            <input
              className="modal-project__input settings-page__container-input"
              onChange={e => nameTest.onChange(e)}
              value={nameTest.value}
              onBlur={e => nameTest.onBlur(e)}
              pattern="[A-Za-zА-Яа-яЁё\D0-9]{1,255}"
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
            {nameTest.isDirty && !nameTest.isEmpty && nameTest.minLengthError && (
              <div>
                <div className={"error-input"}>
                  Поле не может быть меньше 2 символов
                </div>
              </div>
            )}
            <div className="settings-page__container-txt">
              Адрес электронной почты
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
                <div className={"error-input"}>Поле не может быть пустым</div>
              </div>
            )}
            {emailTest.isDirty &&
              !emailTest.isEmpty &&
              emailTest.maxLengthError && (
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

            <div className="settings-page__container-txt">О себе</div>
            <input
              className="modal-project__input settings-page__container-input"
              onChange={e => aboutTest.onChange(e)}
              value={aboutTest.value}
              onBlur={e => aboutTest.onBlur(e)}
              pattern="[A-Za-zА-Яа-яЁё\D\s0-9]{1,400}"
            />
            {!aboutTest.maxLengthError && <span className={"error-input"} />}
            {aboutTest.isDirty && aboutTest.maxLengthError && (
              <div>
                <div className={"error-input"}>
                  Поле не может быть больше 400 символов
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
                <Button text="Сохранить" type="add-task" color="blue" />
              </div>
            ) : (
              <div className="settings-page__container-button">
                <Button
                  text="Сохранить"
                  type="add-task"
                  color="blue"
                  noActive={true}
                />
              </div>
            )}
          </div>
          <div className="settings-page__container">
            <div className="main-page__content-title">Смена пароля</div>
            <div className="settings-page__container-txt">Текущий пароль</div>
            <input
              className="modal-project__input settings-page__container-input"
              type="password"
              onChange={e => passwordOldTest.onChange(e)}
              value={passwordOldTest.value}
              onBlur={e => passwordOldTest.onBlur(e)}
              pattern="[A-Za-zА-Яа-яЁё\D0-9]{4,8}"
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
                <div className={"error-input"}>Поле не может быть пустым</div>
              </div>
            )}
            {passwordOldTest.isDirty &&
              !passwordOldTest.isEmpty &&
              passwordOldTest.maxLengthError && (
                <div>
                  <div className={"error-input"}>
                    Поле не может быть больше 8 символов
                  </div>
                </div>
              )}
            {passwordOldTest.isDirty &&
              !passwordOldTest.isEmpty &&
              !passwordOldTest.maxLengthError &&
              passwordOldTest.minLengthError && (
                <div>
                  <div className={"error-input"}>
                    Минимальная длинна 4 символа
                  </div>
                </div>
              )}
            <div className="settings-page__container-txt">Новый пароль</div>
            <input
              className="modal-project__input settings-page__container-input"
              type="password"
              onChange={e => passwordNewTest.onChange(e)}
              value={passwordNewTest.value}
              onBlur={e => passwordNewTest.onBlur(e)}
              pattern="[A-Za-zА-Яа-яЁё\D0-9]{4,8}"
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
                <div className={"error-input"}>Поле не может быть пустым</div>
              </div>
            )}
            {passwordNewTest.isDirty &&
              !passwordNewTest.isEmpty &&
              passwordNewTest.maxLengthError && (
                <div>
                  <div className={"error-input"}>
                    Поле не может быть больше 8 символов
                  </div>
                </div>
              )}
            {passwordNewTest.isDirty &&
              !passwordNewTest.isEmpty &&
              !passwordNewTest.maxLengthError &&
              passwordNewTest.minLengthError && (
                <div>
                  <div className={"error-input"}>
                    Минимальная длинна 4 символа
                  </div>
                </div>
              )}

            {passwordNewTest.inputValid && passwordOldTest.inputValid ? (
              <div
                className="settings-page__container-button"
                onClick={() => savePassword()}
              >
                <Button text="Сохранить" type="add-task" color="blue" />
              </div>
            ) : (
              <div className="settings-page__container-button">
                <Button
                  text="Сохранить"
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
