import React, { useState, useCallback } from "react";
import "./ModalMenu.scss";

import { ReactComponent as Closed } from "../../svg/closed.svg";

function ModalMenu({ active, setActive }) {
  return (
    <div>
      <div className="modal-menu" onClick={() => setActive(false)}>
        <div className="modal-menu-content" onClick={e => e.stopPropagation()}>
          <div
            className="modal-menu-content__closed"
            onClick={() => setActive(false)}
          >
            <Closed />
          </div>
          <div className="modal-menu-content__title">Меню </div>
          <div className="modal-menu-content__menu">
            <div className="modal-menu-content__item">Главная</div>
            <div className="modal-menu-content__item">Все проекты</div>
            <div className="modal-menu-content__item">Настройки</div>
          </div>

          <div className="modal-menu-content__delete">
            <div className="modal-menu-content__item">Покинуть проект</div>
            <div className="modal-menu-content__item">Удалить проект</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalMenu;
