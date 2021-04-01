import React, { useState, useCallback } from "react";
import "./Header.scss";
import ModalMenu from "../ModalMenu";
import ModalHelp from "../ModalHelp";
import ModalProfile from "../ModalProfile";

import { ReactComponent as Bell } from "../../svg/bell.svg";
import { ReactComponent as Help } from "../../svg/Help.svg";
import { ReactComponent as Menu } from "../../svg/Menu.svg";
import { ReactComponent as Search } from "../../svg/Search.svg";

function Header() {
  const [search, setSearch] = useState("");
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleHelp, setVisibleHelp] = useState(false);
  const [visibleProfile, setVisibleProfile] = useState(false);
  const handleSearchChange = useCallback(
    event => setSearch(event.target.value),
    []
  );

  return (
    <div>
      <div className="header">
        <div className="header__title">Todo</div>
        <div className="header__main">
          <div className="header__main__projects">Другие пректы</div>
          <form className="header__main__search">
            <input
              className="header__main__search-input"
              autoComplete="off"
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
            onClick={() => setVisibleMenu(true)}
          >
            <Menu />
          </div>

          <div
            className="header__main__icon"
            onClick={() => setVisibleHelp(true)}
          >
            <Help />
          </div>
          <div className="header__main__profile" onClick={() => setVisibleProfile(true)}> A</div>
        </div>
      </div>

      {visibleMenu && (
        <ModalMenu active={visibleMenu} setActive={setVisibleMenu} />
      )}
      {visibleHelp && (
        <ModalHelp active={visibleHelp} setActive={setVisibleHelp} />
      )}
      {visibleProfile && (
        <ModalProfile active={visibleProfile} setActive={setVisibleProfile} />
      )}
    </div>
  );
}

export default Header;
