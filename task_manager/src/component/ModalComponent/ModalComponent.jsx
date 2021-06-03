import React, { useCallback, useState } from "react";
import "./ModalComponent.scss";

import { ReactComponent as Closed } from "../../svg/closed.svg";
import { NavLink } from "react-router-dom";

import { ReactComponent as Edit } from "../../svg/edit.svg";
import { ReactComponent as Star } from "../../svg/Star.svg";
import { ReactComponent as Notification } from "../../svg/notifications.svg";
import { ReactComponent as Check } from "../../svg/check.svg";
import { ReactComponent as Add } from "../../svg/add.svg";
import { connect } from "react-redux";
import Users from "../Users/Users";
import { ReactComponent as Search } from "../../svg/Search.svg";
import Button from "../Button";

let mapStateToProps = state => {
  return {
    projects: state.main.projects,
    user: state.users.profile,
    newAction: state.main.newAction,
    actions: state.main.actions,
    tags: state.main.tags
  };
};

const OpenEditTags = ({ id, setActive, setOldForm,oldForm }) => {
  console.log(id, setActive, setOldForm, "name");
  const [tagName, setTagName] = useState("");
  const handleEditTagName = useCallback(
    event => setTagName(event.target.value),
    []
  );
  debugger;
  setOldForm(false);
  const closeForm=()=> {
debugger;
    setOldForm(true);
    setActive(false);
    console.log(oldForm,"old")
  }


  return (
    <div>
      <div className="modal-tags" onClick={() => setActive(false)}>
        <div className="modal-content-tags" onClick={e => e.stopPropagation()}>
          <div className="modal-tags__container">
            <input value={tagName} onChange={handleEditTagName} />
          </div>
          <div onClick={closeForm}>

            <Button text="Готово" type="add-task" color="green" />
          </div>
        </div>
      </div>
    </div>
  );
};

function ModalComponent(props) {
  const [search, setSearch] = useState("");
  // const [editNameTags, setEditNameTags] = useState(false);
  const handleSearchChange = useCallback(
    event => setSearch(event.target.value),
    []
  );

  return (
    <div>
      {props.menu && (
        <div className="modal" onClick={() => props.setActive(false)}>
          <div
            className="modal-content modal-content-menu"
            onClick={e => e.stopPropagation()}
          >
            <div
              className="modal-content__closed"
              onClick={() => props.setActive(false)}
            >
              <Closed />
            </div>
            <div className="modal-content__title">Меню </div>
            <div className="modal-content__menu">
              <NavLink
                to="/"
                className="modal-menu-content__item"
                onClick={() => props.setActive(false)}
              >
                Главная
              </NavLink>
              <NavLink
                to="/projects"
                className="modal-menu-content__item"
                onClick={() => props.setActive(false)}
              >
                Все проекты
              </NavLink>
              <NavLink to="/settings" className="modal-menu-content__item">
                Настройки
              </NavLink>
            </div>
            {props.inproject && (
              <div className="modal-content__delete">
                <div className="modal-content__item">Покинуть проект</div>
                <div className="modal-content__item">Удалить проект</div>
              </div>
            )}
          </div>
        </div>
      )}
      {props.help && (
        <div className="modal" onClick={() => props.setActive(false)}>
          <div
            className="modal-content modal-content-help"
            onClick={e => e.stopPropagation()}
          >
            <div
              className="modal-content__closed"
              onClick={() => props.setActive(false)}
            >
              <Closed />
            </div>
            <div className="modal-content__title">Справка </div>
            <div className="modal-content__menu">
              <div className="modal-content__item">Помощь</div>
              <NavLink to="/useconditions" className="modal-content__item">
                Условия пользования
              </NavLink>
              <NavLink to="/privacy" className="modal-content__item">
                Политика конфиденциальности
              </NavLink>
            </div>
          </div>
        </div>
      )}
      {props.profile && (
        <div className="modal" onClick={() => props.setActive(false)}>
          <div
            className="modal-content modal-content-profile"
            onClick={e => e.stopPropagation()}
          >
            <div
              className="modal-content__closed"
              onClick={() => props.setActive(false)}
            >
              <Closed />
            </div>
            <div className="modal-content__title">Учетная запись </div>

            <div className="modal-content__info">
              <div className="modal-content__info-img">
                {props.user.name.substring(0, 1)}
              </div>
              <NavLink to="/personal" className="modal-content__info-item">
                <div>{props.user.name}</div>
                <div className="modal-content__info-item__email">
                  {props.user.email}
                </div>
              </NavLink>
            </div>
            <div className="modal-content__menu">
              <NavLink to="/personal" className="modal-content__item">
                Профиль
              </NavLink>
              <NavLink to="/settings" className="modal-content__item">
                Настройки
              </NavLink>

              <div className="modal-content__item">Выход</div>
            </div>
          </div>
        </div>
      )}
      {props.orderProject && (
        <div className="modal" onClick={() => props.setActive(false)}>
          <div
            className="modal-content modal-content-project"
            onClick={e => e.stopPropagation()}
          >
            <div
              className="modal-content__closed"
              onClick={() => props.setActive(false)}
            >
              <Closed />
            </div>
            <div className="modal-content__title">Проекты </div>
            <div className="modal-content__menu__projects">
              <div className="modal-content__menu__projects-txt">
                Последние проекты:
              </div>
              {props.projects &&
                props.projects.slice(0, 2).map(project => (
                  <div>
                    <NavLink
                      to={`/projects/${project.id}`}
                      className="modal-content__menu__projects-item"
                    >
                      <div className="modal-content__menu__projects-star">
                        {project.isFavorite === true && <Star />}
                      </div>
                      {project.name}
                    </NavLink>
                  </div>
                ))}
            </div>
            <div className="modal-content__menu__projects__end">
              <NavLink to="/personal" className="modal-content__item">
                Показать все проекты
              </NavLink>
              <NavLink to="/personal" className="modal-content__item">
                Создать новый проект
              </NavLink>
            </div>
          </div>
        </div>
      )}
      {props.notifications && (
        <div className="modal" onClick={() => props.setActive(false)}>
          <div
            className="modal-content modal-content-notifications"
            onClick={e => e.stopPropagation()}
          >
            <div
              className="modal-content__closed"
              onClick={() => props.setActive(false)}
            >
              <Closed />
            </div>
            <div className="modal-content__title">Уведомления </div>
            <div className="modal-content__menu modal-content__menu-notifications">
              {props.newAction.length > 0 ? (
                props.newAction.map(action => (
                  <div
                    className="modal-content__item modal-content__menu-notifications-txt"
                    key={action.id}
                  >
                    {console.log(action, "action")}
                    <div className="modal-content__menu-notifications-icon">
                      <Users userIdArray={[action.users]} count={1} />
                    </div>

                    <div className="modal-content__menu-notifications-container">
                      <Users
                        userIdArray={[action.users]}
                        count={1}
                        userName={true}
                        noIcon
                      />
                      {props.actions.map(
                        act =>
                          act.id === action.type && (
                            <div key={act.id}>{act.name} &nbsp;</div>
                          )
                      )}
                      {props.projects.map(
                        projects =>
                          projects.id === action.project && (
                            <NavLink
                              className="main-page__content__action-item__link"
                              to={`/projects/${projects.id}`}
                              key={projects.id}
                            >
                              <u>{projects.name}</u>
                            </NavLink>
                          )
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="modal-content__menu-notifications-without">
                  <Notification />
                  <div className="modal-content__menu-notifications-without-txt">
                    Уведомлений пока нет
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {props.addTags && (
        <div className="modal-tags" onClick={() => props.setActive(false)}>
          <div
            className="modal-content-tags"
            onClick={e => e.stopPropagation()}
          >
            <form className="modal-tags__search">
              <input
                className="modal-tags__search-input"
                autoComplete="off"
                placeholder={"Поиск..."}
                name="search"
                type="search"
                value={search}
                onChange={handleSearchChange}
              />
              <button className="modal-tags__search-button">
                <Search />
              </button>
            </form>
            <div className="modal-tags__container">
              {props.tags.map(tags => (
                <div className="modal-tags__string" key={tags.id}>
                  <div className="modal-tags__item">
                    <div>
                      {tags.name.length > 12
                        ? `${tags.name.substring(0, 5)}...`
                        : tags.name}
                    </div>

                    {props.tag.map(
                      tag =>
                        tags.id === tag && (
                          <div>
                            <Check />
                          </div>
                        )
                    )}
                  </div>
                  <div
                    className="modal-tags__container-edit"
                    onClick={() => props.setEditNameTags(tags.id)}
                  >
                    <Edit />
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-tags__add">
              <div>
                <Add />
              </div>
              <div>Добавить метку</div>
            </div>
          </div>
        </div>
      )}
      {props.updateTags && (
        <OpenEditTags
          setOldForm={props.setOldForm}
          setActive={props.setActive}
          id={props.id}
        />
      )}
    </div>
  );
}

export default connect(mapStateToProps)(ModalComponent);
