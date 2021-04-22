import React from "react";
import "./ModalMenu.scss";

import { ReactComponent as Closed } from "../../svg/closed.svg";
import {NavLink} from "react-router-dom";

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
            <NavLink to="/" className="modal-menu-content__item" onClick={()=> setActive(false)}>Главная</NavLink>
            <NavLink to="/projects" className="modal-menu-content__item" onClick={()=> setActive(false)}>Все проекты</NavLink>
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
