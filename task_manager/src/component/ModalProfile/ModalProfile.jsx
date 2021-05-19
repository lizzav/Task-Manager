import React from "react";
import "./ModalProfile.scss";

import { ReactComponent as Closed } from "../../svg/closed.svg";
import { NavLink } from "react-router-dom";

function ModalProfile({ active, setActive }) {
  return (
    <div>
      <div className="modal-profile" onClick={() => setActive(false)}>
        <div
          className="modal-profile-content"
          onClick={e => e.stopPropagation()}
        >
          <div
            className="modal-profile-content__closed"
            onClick={() => setActive(false)}
          >
            <Closed />
          </div>
          <div className="modal-profile-content__title">Учетная запись </div>

          <div className="modal-profile-content__info">
            <div className="modal-profile-content__info-img">A</div>
            <NavLink
              to="/personal"
              className="modal-profile-content__info-item"
            >
              <div>Имя Фамилия</div>
              <div className="modal-profile-content__info-item__email">
                pochta@gmail.com
              </div>
            </NavLink>
          </div>
          <div className="modal-profile-content__menu">
            <NavLink to="/personal" className="modal-profile-content__item">
              Профиль
            </NavLink>
            <NavLink to="/settings" className="modal-profile-content__item">
              Настройки
            </NavLink>

            <div className="modal-profile-content__item">Выход</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProfile;
