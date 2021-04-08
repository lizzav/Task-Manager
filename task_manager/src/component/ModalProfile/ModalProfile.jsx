import React from "react";
import "./ModalProfile.scss";

import { ReactComponent as Closed } from "../../svg/closed.svg";

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
            <div className="modal-profile-content__info-item">
              <div>Имя Фамилия</div>
              <div className="modal-profile-content__info-item__email">
                pochta@gmail.com
              </div>
            </div>
          </div>
          <div className="modal-profile-content__menu">
            <div className="modal-profile-content__item">Профиль</div>
            <div className="modal-profile-content__item">Настройки</div>

            <div className="modal-profile-content__item">Выход</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProfile;
