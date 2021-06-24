import React, { useCallback, useState } from "react";
import "./ModalAddTask.scss";

import Button from "../Button";
import {deleteTask, sendProject, sendTask, updateTasks} from "../../redux/projects-reducer";
import { connect } from "react-redux";
import { ReactComponent as Closed } from "../../svg/closed.svg";
import Users from "../Users/Users";

let mapStateToProps = state => {
  return {
    state: state.main,
    user: state.users.profile,
    users: state.users.users
  };
};

function ModalAddTask(props) {
  const getProjectData = type => {
    switch (type) {
      case "name":
        return props.task.name ? props.task.name : "";
      case "description":
        return props.task.description ? props.task.description : "";
      case "author":
        return props.task.author ? props.task.author : props.user.id;
      case "users":
        return props.task.users ? props.task.users : null;
      case "tag":
        return props.task.tags ? props.task.tags : 1;
      default:
        return "";
    }
  };
  const [nameProject, setNameProject] = useState(getProjectData("name"));
  const [descriptionProject, setDescriptionProject] = useState(getProjectData("description"));
  const [activeStatus, setActiveStatus] = useState(getProjectData("tag"));
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

  const saveNewProjectClick = () => {console.log(props.task.name)
    props.task.name ?
      props.updateTasks(props.task.id,nameProject, descriptionProject,author, users, activeStatus):
    props.sendTask(props.projectId,nameProject, descriptionProject,author, users, activeStatus);
    props.setActive(false);
  };
  const deleteTaskf = () => {
    props.deleteTask(props.task.id);
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
            <div>Задача</div>
            <Closed onClick={() => props.setActive(false)} />
          </div>
          <input
            className="modal-project__input input__name"
            placeholder="Название задачи"
            onChange={handleProjectNameChange}
            value={nameProject}
          />

          <div className="project__select__status">
            <div className="add-item-status">Сложность</div>
            <div
              onClick={() => setActiveStatus(1)}
              className={
                activeStatus === 1
                  ? "active-status-project project-add__tag-easy"
                  : "project-add__tag-easy"
              }
            >
              Легкая
            </div>
            <div
              onClick={() => setActiveStatus(2)}
              className={
                activeStatus === 2
                  ? "active-status-project project-add__tag-normal"
                  : "project-add__tag-normal"
              }
            >
              Средняя
            </div>
            <div
              onClick={() => setActiveStatus(3)}
              className={
                activeStatus === 3
                  ? "active-status-project project-add__tag-difficult"
                  : "project-add__tag-difficult"
              }
            >
              Сложная
            </div>
          </div>
          <div className="task__users">
            <div>
              <div className="add-item">Создатель</div>

              {props.users.map(
                user =>
                  user.id === author && (
                    <div className={"task__users-user"} key={user.id}>
                      <div className="project__users-user ">
                        <Users userIdArray={user.name.substring(0, 1)} />
                      </div>
                      &nbsp;{user.name}
                    </div>
                  )
              )}
            </div>

            <div>
              <div className="add-item">Исполнитель</div>
              {!users && (
                <div
                  className="add-users-task"
                  onClick={() => setAddUsers(true)}
                >
                  Добавить
                </div>
              )}
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
                            users === user.id
                              ? "add__user__modal__item-active add__user__modal__item"
                              : "add__user__modal__item"
                          }
                          key={user.id}
                          onClick={() => setUsers(user.id)}
                        >
                          <div className="add__user__modal__item-txt">
                            <Users userIdArray={user.name.substring(0, 1)} />
                            &nbsp;{user.name}
                            {user.id === props.user.id && <>(Я)</>}
                          </div>
                          {users === user.id ? (
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
                  props.users.map(
                    user =>
                      user.id === users && (
                        <div className={"task__users-user"} key={user.id}>
                          <div className="project__users-user ">
                            <Users userIdArray={user.name.substring(0, 1)} />
                            <div
                              className="project__users-user__delete"
                              onClick={() => setUsers("")}
                            >
                              <Closed />
                            </div>
                          </div>
                          &nbsp;{user.name}
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>

          <div className={"add-item"}>Дополнительные поля (необязательные)</div>
          <input
            className="modal-project__input"
            placeholder="Введите описание проекта"
            onChange={handleProjectDescriptionChange}
            value={descriptionProject}
          />

          <div className="modal-task__button">
            {!props.task.name ? (
              <div onClick={() => props.setActive(false)}>
                <Button text="Удалить" type="add-task" color="rad" />
              </div>
            ) : (
              <div onClick={() => deleteTaskf()}>
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

export default connect(mapStateToProps, { sendTask, updateTasks , deleteTask})(ModalAddTask);
