import React, { useCallback, useState } from "react";

import "./SettingsPage.scss";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import { connect } from "react-redux";
import Button from "../../component/Button";
import { updatePassword, updateUser } from "../../redux/profile-reducer";
import { Redirect } from "react-router-dom";

let mapStateToProps = state => {
  return {
    state: state.users.users,
    user: state.users.profile.id
  };
};

function SettingsPage(props) {
  const userData = props.state.filter(user => user.id === props.user)[0];
  console.log(props.state.filter(user => user.id === props.user));
  const getUserData = type => {
    switch (type) {
      case "name":
        return userData && userData.name ? userData.name : false;
      case "email":
        return userData && userData.email ? userData.email : false;
      case "about":
        return userData && userData.about ? userData.about : false;
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
            <div className="main-page__content-title">Основная информация</div>
            <div className="settings-page__container-txt">Имя пользователя</div>
            <input
              className="modal-project__input settings-page__container-input"
              value={name}
              onChange={handleChangeName}
            />
            <div className="settings-page__container-txt">
              Адрес электронной почты
            </div>
            <input
              className="modal-project__input settings-page__container-input"
              type="email"
              value={email}
              onChange={handleChangeEmail}
            />

            <div className="settings-page__container-txt">О себе</div>
            <textarea
              className="modal-project__input settings-page__container-input"
              value={about}
              onChange={handleChangeAbout}
            />

            {getUserData("name") !== name ||
            getUserData("email") !== email ||
            getUserData("about") !== about ? (
              <div
                className="settings-page__container-button"
                onClick={() => props.updateUser(props.user, name, email, about)}
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
              value={passwordOld}
              type="password"
              onChange={handleChangeOldPassword}
            />
            <div className="settings-page__container-txt">Новый пароль</div>
            <input
              className="modal-project__input settings-page__container-input"
              type="password"
              value={passwordNew}
              onChange={handleChangeNewPassword}
            />
            {passwordNew && passwordOld ? (
              <div
                className="settings-page__container-button"
                onClick={() =>
                  props.updatePassword(props.user, passwordOld, passwordNew)
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
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { updateUser, updatePassword })(
  SettingsPage
);
