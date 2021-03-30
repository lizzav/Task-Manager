import React, { useState, useCallback } from "react";
import "./Header.scss";

import { ReactComponent as Bell } from "../../svg/bell.svg";
import { ReactComponent as Help } from "../../svg/Help.svg";
import { ReactComponent as Menu } from "../../svg/Menu.svg";
import { ReactComponent as Search } from "../../svg/Search.svg";

import { ReactComponent as Closed } from "../../svg/closed.svg";
function Header() {
  const [search, setSearch] = useState("");
  const [visibleMenu, setVisibleMenu] = useState(false);
  const handleSearchChange = useCallback(
    event => setSearch(event.target.value),
    []
  );

  return (
    <div className="header">
      <div className="header__title">Todo</div>
      <div className="header__main">
        <div className="header__main__projects">Другие пректы</div>
        <form className="header__main__search">
          <input
            className="header__main__search-input"
            autocomplete="off"
            placeholder={"Поиск..."}
            name="search"
            type="search"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="header__main__search-button">
            <Search />
          </button>
        </form>
        <div className="header__main__icon">
          <Bell />
        </div>
        <div
          className="header__main__icon"
          onClick={() => setVisibleMenu(!visibleMenu)}
        >
          <Menu />

        </div>

        <div className="header__main__icon">
          <Help />
        </div>
        <div className="header__main__profile"> prof</div>
      </div>
      {visibleMenu && (
      <div className="hello">
        <div className="hello__closed" onClick={()=>setVisibleMenu(false)}><Closed/></div>
        <div className="hello__title">Меню   </div>
        <div className="hello__menu">

          <div className="hello__item">Главная</div>
          <div className="hello__item">Все проекты</div>
          <div className="hello__item">Настройки</div>
        </div>

        <div className="hello__delete">
          <div className="hello__item">Покинуть проект</div>
          <div className="hello__item">Удалить проект</div>
        </div>
      </div>
    )}
    </div>
  );
}

export default Header;
