import React, { useState } from "react";
import "./Menu.scss";

import { ReactComponent as Add } from "../../svg/add.svg";
import { NavLink } from "react-router-dom";
import ModalAddProject from "../ModalAddProject";

function Menu() {
  const [visibleFormAddNewProject, setVisibleFormAddNewProject] = useState(
    false
  );

  return (
    <div>
      <div className="menu">
        <div className="menu__content">
          <NavLink
            to="/"
            exact={true}
            className="menu__content__item"
            activeClassName="menu__content__item-active"
          >
            Главная
          </NavLink>
          <NavLink
            to="/projects"
            className="menu__content__item"
            activeClassName="menu__content__item-active"
          >
            Проекты
          </NavLink>
          <NavLink
            to="/personal"
            className="menu__content__item"
            activeClassName="menu__content__item-active"
          >
            Личный кабинет
          </NavLink>
          <NavLink
            to="/settings"
            className="menu__content__item"
            activeClassName="menu__content__item-active"
          >
            Настройки
          </NavLink>
        </div>
        <div
          className="menu-add-new-project"
          onClick={() => setVisibleFormAddNewProject(true)}
        >
          <Add /> Создать
        </div>
      </div>
      {visibleFormAddNewProject && (
        <ModalAddProject
          active={visibleFormAddNewProject}
          setActive={setVisibleFormAddNewProject}
        />
      )}
    </div>
  );
}

export default Menu;
