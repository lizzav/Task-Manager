import React, { useState, useCallback } from "react";
import { ReactComponent as Google } from "../../svg/Google.svg";
import { ReactComponent as Facebook } from "../../svg/Facebook.svg";
import { ReactComponent as Instagram } from "../../svg/instagram.svg";
import './LoginPage.css';

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
      },
    [login, password]
  );

  return (
    <div className="login-page">
      <h1 className="login-page__title">ToDo</h1>
      <div className="login-form">
        <div className="login-form__header">
          <h2 className="login-form__title">Вход в ToDO</h2>
        </div>
        <form className="login-form__form" onSubmit={handleSubmit}>
          <div className="login-form__fields">
            <div className="login-form__field">
              <input
                className="login-form__field-wrapper"
                name="login"
                label="Логин"
                value={login}
                onChange={handleLoginChange}
              />
            </div>
            <div className="login-form__field">
              <input
                className="login-form__field-wrapper"
                name="password"
                type="password"
                label="Пароль"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="login-form__field">
              <button
                className="login-form__field-button"
                name="login"
                type="submit"
                label="Вход"
              >
                Вход
              </button>
            </div>
          </div>
          <div className="login-form__field">
            <div href="#" className="login-form__field-link">
              Войти через Google
              <Google />
            </div>
          </div>
                    <div className="login-form__field">
            <div href="#" className="login-form__field-link">
              Войти через Instagram
              <Instagram />
            </div>
          </div>
          <div className="login-form__field">
            <div href="#" className="login-form__field-link">
              Войти через Facebook
              <Facebook />
            </div>
          </div>

          <div className="login-form__reset link">
            Нет аккаунта? Регистрация
          </div>
          <div className="login-form__reset link">Забыли пароль?</div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
