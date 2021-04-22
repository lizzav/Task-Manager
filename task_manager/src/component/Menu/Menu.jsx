import React, { useState} from "react";
import "./Menu.scss";

import { ReactComponent as Add } from "../../svg/add.svg";
import {NavLink} from "react-router-dom"
import ModalAddProject from "../ModalAddProject";

function Menu() {

  const [visibleFormAddNewProject, setVisibleFormAddNewProject] = useState(false);

  return (
    <div>
    <div className="menu">
      <div className="menu__content">

        <NavLink to="/" className="menu__content__item" activeClassName="menu__content__item-active">Главная</NavLink>
        <NavLink to="/projects" className="menu__content__item" activeClassName="menu__content__item-active">Проекты</NavLink>
        <div className="menu__content__item">Личный кабинет</div>
        <div className="menu__content__item">Настройки</div>
      </div>
      <div className="menu-add-new-project" onClick={()=>setVisibleFormAddNewProject(true)}>
        <Add /> Создать
      </div>
    </div>
      {visibleFormAddNewProject && <ModalAddProject active={visibleFormAddNewProject} setActive={setVisibleFormAddNewProject}/>}
    </div>
  );
}

export default Menu;
