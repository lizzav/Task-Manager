import React, { useState, useCallback } from "react";
import { ReactComponent as Google } from "../../svg/Google.svg";
import { ReactComponent as Vk } from "../../svg/Vk.svg";
import { ReactComponent as Yandex } from "../../svg/yandex.svg";
import "./RegistrationPage.scss";
import Button from "../../component/Button";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLoginChange = useCallback(
    event => setLogin(event.target.value),
    []
  );
  const handlePasswordChange = useCallback(
    event => setPassword(event.target.value),
    []
  );
  const handleNameChange = useCallback(
    event => setName(event.target.value),
    []
  );
  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
    },
    [login, password]
  );

  return (
    <div className="registration-page">
      <div className="registration-page__title">ToDo</div>
      <div className="registration-page__content">
        <div className="registration-page__content__title">
          Регистрация в ToDO
        </div>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="registration-form__form">
            <input
              className="registration-form__form__input"
              placeholder={"Введите адрес электронной почты"}
              name="email"
              type="email"
              value={login}
              onChange={handleLoginChange}
            />
            <input
              className="registration-form__form__input"
              placeholder={"Введите имя"}
              name="name"
              value={name}
              onChange={handleNameChange}
            />
            <input
              className="registration-form__form__input"
              name="password"
              placeholder={"Введите пароль"}
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button text="Зарегистироваться" type="login" color="blue" />
          </div>
          <div className="registration-form__link">
            <div className="registration-form__link__txt forgot" />
            <div className="registration-form__link__reg">
              Войти через Google&nbsp;
              <Google className="registration-form__link__reg__img" />
            </div>
            <div className="registration-form__link__reg">
              Войти через Вконтакте&nbsp;
              <Vk className="registration-form__link__reg__img" />
            </div>
            <div className="registration-form__link__reg">
              Войти через Яндекс&nbsp;
              <Yandex className="registration-form__link__reg__img" />
            </div>
            <div className="registration-form__link__txt reg">
              Уже есть аккаунт? Войдите
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
