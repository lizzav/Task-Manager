import React, { useCallback, useState } from "react";

import "./SettingsPage.scss";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import { connect } from "react-redux";
import Button from "../../component/Button";
import { updatePassword, updateUser } from "../../redux/profile-reducer";

let mapStateToProps = state => {
  return {
    state: state.users.profile
  };
};

function SettingsPage(props) {
  const getUserData = type => {
    switch (type) {
      case "name":
        return props.state.name ? props.state.name : false;
      case "email":
        return props.state.email ? props.state.email : false;
      case "about":
        return props.state.about ? props.state.about : false;
      default:
        return "";
    }
  };
  const [name, setName] = useState(getUserData("name"));
  const [email, setEmail] = useState(getUserData("email"));
  const [about, setAbout] = useState(getUserData("about"));
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const handleChangeName = useCallback(
    event => setName(event.target.value),
    []
  );
  const handleChangeEmail = useCallback(
    event => setEmail(event.target.value),
    []
  );
  const handleChangeAbout = useCallback(
    event => setAbout(event.target.value),
    []
  );
  const handleChangeNewPassword = useCallback(
    event => setPasswordNew(event.target.value),
    []
  );
  const handleChangeOldPassword = useCallback(
    event => setPasswordOld(event.target.value),
    []
  );
  return (
    <div className="settings-page">
      {console.log(props.state)}
      <div>
        <Header />
        <Menu />
      </div>
      <div className="settings-page__content">
        <div className="settings-page__header">
          <div className="settings-page__header-icon">
            {props.state.name.substring(0, 1)}
          </div>
          <div className="settings-page__header__sub">
            <div className="settings-page__header__sub-name">
              {props.state.name}
            </div>
            <div className="settings-page__header__sub-email">
              {props.state.email}
            </div>
          </div>
        </div>
        <div className="settings-page__settings">
          <div className="settings-page__settings__info settings-page__container">
            <div className="settings-page__container-title">
              Основная информация
            </div>
            <div className="settings-page__container-txt">Имя пользователя</div>
            <input
              className="settings-page__container-input"
              value={name}
              onChange={handleChangeName}
            />
            <div className="settings-page__container-txt">
              Адрес электронной почты
            </div>
            <input
              className="settings-page__container-input"
              type="email"
              value={email}
              onChange={handleChangeEmail}
            />

            <div className="settings-page__container-txt">О себе</div>
            <textarea
              className="settings-page__container-input settings-page__container-input-about"
              value={about}
              onChange={handleChangeAbout}
            />

            {getUserData("name") !== name ||
            getUserData("email") !== email ||
            getUserData("about") !== about ? (
              <div
                className="settings-page__container-button"
                onClick={() => props.updateUser(name, email, about)}
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
          <div className="settings-page__container settings-page__settings__password ">
            <div className="settings-page__container-title">Смена пароля</div>
            <div className="settings-page__container-txt">Текущий пароль</div>
            <input
              className="settings-page__container-input"
              value={passwordOld}
              type="password"
              onChange={handleChangeOldPassword}
            />
            <div className="settings-page__container-txt">Новый пароль</div>
            <input
              className="settings-page__container-input"
              type="password"
              value={passwordNew}
              onChange={handleChangeNewPassword}
            />
            {passwordNew && passwordOld ? (
              <div
                className="settings-page__container-button"
                onClick={() => props.updatePassword(passwordOld, passwordNew)}
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
    </div>
  );
}

export default connect(mapStateToProps, { updateUser, updatePassword })(
  SettingsPage
);
