import React, { useState } from "react";
import "./ModalAddTask.scss";

import Button from "../Button";
import {
  deleteTask,
  sendTask,
  updateTasks
} from "../../redux/projects-reducer";
import { connect } from "react-redux";
import { ReactComponent as Closed } from "../../svg/closed.svg";
import Users from "../Users/Users";
import { useInput } from "../Validation";
import ButtonForModalBottom from "../ButtonForModalBottom";
import Input from "../Input";
import { DescriptionPattern, NameProjectPattern } from "../PatternConst";
import Validation from "../Validation/Validation";
import ModalAddUsers from "../ModalAddUsers";

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

  const nameProjectTest = useInput(getProjectData("name"), {
    maxLength: 255,
    isEmpty: true
  });
  const descriptionProjectTest = useInput(getProjectData("description"), {
    maxLength: 400
  });
  const [activeStatus, setActiveStatus] = useState(getProjectData("tag"));
  const [addUsers, setAddUsers] = useState(false);
  const author = getProjectData("author");
  const [users, setUsers] = useState(getProjectData("users"));

  const saveNewProjectClick = () => {
    props.task.name
      ? props.updateTasks(
          props.task.id,
          nameProjectTest.value,
          descriptionProjectTest.value,
          author,
          users,
          activeStatus
        )
      : props.sendTask(
          props.projectId,
          nameProjectTest.value,
          descriptionProjectTest.value,
          author,
          users,
          activeStatus
        );
    props.setActive(false);
  };
  const deleteTaskf = () => {
    props.deleteTask(props.task.id);
    props.setActive(false);
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

          <Input
            value={nameProjectTest}
            pattern={NameProjectPattern}
            type={""}
            placeholder={"Название задачи"}
          />
          <Validation value={nameProjectTest} maxLength={255} />

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
                <ModalAddUsers
                  propsUsers={props.usersInProject}
                  users={users}
                  setAddUsers={setAddUsers}
                  setUsers={setUsers}
                  isTask={true}
                />
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
          <div className={"add-item"} style={{ margin: 0 }}>
            Описание
          </div>
          <Input
            value={descriptionProjectTest}
            pattern={DescriptionPattern}
            type={""}
            placeholder={"Введите описание задачи"}
          />
          <Validation
            value={descriptionProjectTest}
            maxLength={400}
            empty={true}
          />

          <ButtonForModalBottom
            users={users}
            description={descriptionProjectTest}
            name={nameProjectTest}
            setActive={props.setActive}
            deleteTaskf={deleteTaskf}
            propsTask={props.task}
            saveNewProjectClick={saveNewProjectClick}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { sendTask, updateTasks, deleteTask })(
  ModalAddTask
);
