import React, { useState } from "react";

import "./SettingsPage.scss";
import { connect } from "react-redux";
import Button from "../../component/Button";
import { updatePassword, updateUser } from "../../redux/profile-reducer";
import { Redirect } from "react-router-dom";
import ModalWindow from "../../component/ModalWindow";
import { useInput } from "../../component/Validation";
import MenuAndHeader from "../../component/MenuAndHeader";
import Validation from "../../component/Validation/Validation";
import Input from "../../component/Input";
import {
  DescriptionPattern,
  EmailPattern,
  PasswordPattern,
  UserNamePattern
} from "../../component/PatternConst";

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
    maxLength: 12,
    isEmpty: true
  });
  const passwordNewTest = useInput("", {
    minLength: 4,
    maxLength: 12,
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
        <div>
          <div className=" settings-page__container">
            <div className="main-page__content-title">Основная информация</div>
            <div className="settings-page__container-txt">Имя пользователя</div>

            <Input
              value={nameTest}
              pattern={UserNamePattern}
              type={"name"}
              placeholder={"Имя пользователя"}
            />
            <Validation value={nameTest} maxLength={50} minLength={2} />

            <div className="settings-page__container-txt">
              Адрес электронной почты
            </div>

            <Input
              value={emailTest}
              pattern={EmailPattern}
              type={"email"}
              placeholder={"E-mail"}
            />
            <Validation value={emailTest} maxLength={255} />

            <div className="settings-page__container-txt">О себе</div>

            <Input
              value={aboutTest}
              pattern={DescriptionPattern}
              type={"text"}
              placeholder={"О себе"}
            />
            <Validation value={aboutTest} maxLength={400} empty={true} />

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

            <Input
              value={passwordOldTest}
              pattern={PasswordPattern}
              type={"password"}
              placeholder={"Старый пароль"}
            />
            <Validation value={passwordOldTest} maxLength={12} minLength={4} />

            <div className="settings-page__container-txt">Новый пароль</div>

            <Input
              value={passwordNewTest}
              pattern={PasswordPattern}
              type={"password"}
              placeholder={"Новый пароль"}
            />
            <Validation value={passwordNewTest} maxLength={12} minLength={4} />

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
