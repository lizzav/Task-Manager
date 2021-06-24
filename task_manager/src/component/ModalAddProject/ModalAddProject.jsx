import React, { useCallback, useState } from "react";
import "./ModalAddProject.scss";

import Button from "../Button";
import {
  deleteProject,
  sendProject,
  updateProject
} from "../../redux/projects-reducer";
import { connect } from "react-redux";
import { ReactComponent as Closed } from "../../svg/closed.svg";
import Users from "../Users/Users";
import { Redirect } from "react-router-dom";

let mapStateToProps = state => {
  return {
    state: state.main,
    user: state.users.profile,
    users: state.users.users
  };
};

function ModalAddProject(props) {
  const getProjectData = type => {
    switch (type) {
      case "name":
        return props.project.name ? props.project.name : "";
      case "description":
        return props.project.description ? props.project.description : "";
      case "author":
        return props.project.author ? props.project.author : props.user.id;
      case "users":
        return props.project.users ? props.project.users : [author];
      case "status":
        return props.project.status ? props.project.status : 1;
      default:
        return "";
    }
  };
  const [nameProject, setNameProject] = useState(getProjectData("name"));
  const [descriptionProject, setDescriptionProject] = useState(
    getProjectData("description")
  );
  const [activeStatus, setActiveStatus] = useState(getProjectData("status"));
  const [addUsers, setAddUsers] = useState(false);
  const [author, setAuthor] = useState(getProjectData("author"));
  const [users, setUsers] = useState(getProjectData("users"));
  const handleProjectNameChange = useCallback(
    event => setNameProject(event.target.value),
    []
  );
  const handleProjectDescriptionChange = useCallback(
    event => setDescriptionProject(event.target.value),
    []
  );
  console.log(props.project);

  const deleteProjectF = () => {
    props.deleteProject(props.project.id);
    props.setActive(false);
    return <Redirect to={"/"} />;
  };

  const saveNewProjectClick = () => {
    props.project.name
      ? props.updateProject(
          props.project.id,
          nameProject,
          descriptionProject,
          author,
          users,
          activeStatus
        )
      : props.sendProject(
          nameProject,
          descriptionProject,
          author,
          users,
          activeStatus
        );
    props.setActive(false);
  };

  const indx = (state, id) => {
    return state.findIndex(el => el === parseInt(id));
  };
  return (
    <div>
      <div
        className="bg-close modal-project-bg"
        onClick={() => props.setActive(false)}
      >
        <div className="modal-project" onClick={e => e.stopPropagation()}>
          <div className="modal-project__header">
            <div>Проект</div>
            <Closed onClick={() => props.setActive(false)} />
          </div>
          <input
            className="modal-project__input input__name"
            placeholder="Название проекта"
            onChange={handleProjectNameChange}
            value={nameProject}
          />

          <div className="project__select__status">
            <div className="add-item-status">Статус</div>
            <div
              onClick={() => setActiveStatus(1)}
              className={
                activeStatus === 1
                  ? "active-status-project project-add__status-active"
                  : "project-add__status-active"
              }
            >
              Активный
            </div>
            <div
              onClick={() => setActiveStatus(2)}
              className={
                activeStatus === 2
                  ? "active-status-project project-add__status-stop"
                  : "project-add__status-stop"
              }
            >
              Приостановлен
            </div>
            <div
              onClick={() => setActiveStatus(3)}
              className={
                activeStatus === 3
                  ? "active-status-project project-add__status-complete"
                  : "project-add__status-complete"
              }
            >
              Завершен
            </div>
          </div>
          <div>
            <div className="add-item">Создатель</div>
            {props.users.map(
              user => user.id === author && <div>{user.name}</div>
            )}
          </div>
          <div className={"add-item"}>Дополнительные поля (необязательные)</div>
          <input
            className="modal-project__input"
            placeholder="Введите описание проекта"
            onChange={handleProjectDescriptionChange}
            value={descriptionProject}
          />
          <div className="command-project">
            <div className="add-item">Команда</div>
            <div className="add-users" onClick={() => setAddUsers(true)}>
              {" "}
              Добавить пользователей{" "}
            </div>
            {addUsers && (
              <div>
                <div
                  className="bg-close modal-project-bg"
                  onClick={() => setAddUsers(false)}
                >
                  <div
                    className="add__user__modal"
                    onClick={e => e.stopPropagation()}
                  >
                    <div
                      className="add__user__modal-closed"
                      onClick={() => setAddUsers(false)}
                    >
                      {" "}
                      <Closed />
                    </div>
                    {props.users.map(user => (
                      <div
                        className={
                          users.filter(userId => userId === user.id)[0] ===
                          user.id
                            ? "add__user__modal__item-active add__user__modal__item"
                            : "add__user__modal__item"
                        }
                        key={user.id}
                        onClick={() =>
                          indx(users, user.id) === -1
                            ? setUsers([...users, user.id])
                            : setUsers([
                                ...users.slice(0, indx(users, user.id)),
                                ...users.slice(indx(users, user.id) + 1)
                              ])
                        }
                      >
                        <div className="add__user__modal__item-txt">
                          <Users userIdArray={user.name.substring(0, 1)} />
                          &nbsp;{user.name}
                          {user.id === props.user.id && <>(Я)</>}
                        </div>
                        {users.filter(userId => userId === user.id)[0] ===
                        user.id ? (
                          <div className="add__user__modal__item-txt__check">
                            <Closed />
                          </div>
                        ) : (
                          <div className="add__user__modal__item-txt__check-transparent">
                            <Closed />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="project__users">
              {users &&
                users.map(userId =>
                  props.users.map(
                    user =>
                      user.id === userId && (
                        <div key={user.id} className="project__users-user ">
                          <Users userIdArray={user.name.substring(0, 1)} />
                          <div
                            className="project__users-user__delete"
                            onClick={() =>
                              setUsers([
                                ...users.slice(0, indx(users, user.id)),
                                ...users.slice(indx(users, user.id) + 1)
                              ])
                            }
                          >
                            <Closed />
                          </div>
                        </div>
                      )
                  )
                )}
            </div>
          </div>

          <div className="modal-task__button">
            {!props.project.name ? (
              <div onClick={() => props.setActive(false)}>
                <Button text="Удалить" type="add-task" color="rad" />
              </div>
            ) : (
              <div onClick={() => deleteProjectF()}>
                <Button text="Удалить" type="add-task" color="rad" />
              </div>
            )}
            {nameProject ? (
              <div onClick={saveNewProjectClick}>
                <Button text="Сохранить" type="add-task" color="blue" />
              </div>
            ) : (
              <Button
                text="Сохранить"
                type="add-task"
                color="blue"
                noActive={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {
  sendProject,
  updateProject,
  deleteProject
})(ModalAddProject);
