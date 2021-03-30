import React, { useState, useCallback } from "react";
import { ReactComponent as Google } from "../../svg/Google.svg";
import { ReactComponent as Vk } from "../../svg/Vk.svg";
import { ReactComponent as Yandex } from "../../svg/yandex.svg";
import "./LoginPage.scss";
import Button from "../../component/Button";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = useCallback(
    event => setLogin(event.target.value),
    []
  );
  const handlePasswordChange = useCallback(
    event => setPassword(event.target.value),
    []
  );

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      console.log("knopka");
    },
    [login, password]
  );

  return (
    <div className="login-page">
      <div className="login-page__title">ToDo</div>
      <div className="login-page__content">
        <div className="login-page__content__title">Вход в ToDO</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form__form">
            <input
              className="login-form__form__input"
              placeholder={"Введите адрес электронной почты"}
              name="login"
              type="email"
              value={login}
              onChange={handleLoginChange}
            />
            <input
              className="login-form__form__input"
              name="password"
              placeholder={"Введите пароль"}
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <Button text="Войти" type="login" color="blue" />
            {/*<button>войти</button>*/}
          </div>
          <div className="login-form__link">
            <div className="login-form__link__txt forgot">Забыли пароль?</div>

            <div className="login-form__link__reg">
              Войти через Google&nbsp;
              <Google className="login-form__link__reg__img" />
            </div>

            <div className="login-form__link__reg">
              Войти через Вконтакте&nbsp;
              <Vk className="login-form__link__reg__img" />
            </div>

            <div className="login-form__link__reg">
              Войти через Яндекс&nbsp;
              <Yandex className="login-form__link__reg__img" />
            </div>

            <div className="login-form__link__txt reg">
              Нет аккаунта? Регистрация
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
