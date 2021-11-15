import React, { useState } from "react";
import "./ModalAddProject.scss";
import {
  deleteProject,
  sendProject,
  updateProject
} from "../../redux/projects-reducer";
import { connect } from "react-redux";
import { ReactComponent as Closed } from "../../svg/closed.svg";
import Users from "../Users/Users";
import { Redirect } from "react-router-dom";
import { useInput } from "../Validation";
import Input from "../Input";
import { DescriptionPattern, NameProjectPattern } from "../PatternConst";
import Validation from "../Validation/Validation";
import ModalAddUsers from "../ModalAddUsers";
import ButtonForModalBottom from "../ButtonForModalBottom";

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
        return props.project.users ? props.project.users : [props.user.id];
      case "status":
        return props.project.status ? props.project.status : 1;
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

  const [activeStatus, setActiveStatus] = useState(getProjectData("status"));
  const [addUsers, setAddUsers] = useState(false);
  const author = getProjectData("author");
  const [users, setUsers] = useState(getProjectData("users"));

  const deleteProjectF = () => {
    props.deleteProject(props.project.id);
    props.setActive(false);
    return <Redirect to={"/"} />;
  };

  const saveNewProjectClick = () => {
    props.project.name
      ? props.updateProject(
          props.project.id,
          nameProjectTest.value,
          descriptionProjectTest.value,
          author,
          users,
          activeStatus
        )
      : props.sendProject(
          nameProjectTest.value,
          descriptionProjectTest.value,
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

          <Input
            value={nameProjectTest}
            pattern={NameProjectPattern}
            type={""}
            placeholder={"Название проекта"}
          />
          <Validation value={nameProjectTest} maxLength={255} />

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

          <Input
            value={descriptionProjectTest}
            pattern={DescriptionPattern}
            type={""}
            placeholder={"Введите описание проекта"}
          />
          <Validation
            value={descriptionProjectTest}
            maxLength={400}
            empty={true}
          />

          <div className="command-project">
            <div className="add-item" style={{ marginTop: 0 }}>
              Команда
            </div>
            <div className="add-users" onClick={() => setAddUsers(true)}>
              Добавить пользователей
            </div>

            {addUsers && (
              <ModalAddUsers
                propsUsers={props.users}
                users={users}
                setAddUsers={setAddUsers}
                setUsers={setUsers}
                indx={indx}
              />
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

          <ButtonForModalBottom
            description={descriptionProjectTest}
            name={nameProjectTest}
            setActive={props.setActive}
            deleteTaskf={deleteProjectF}
            propsTask={props.project}
            saveNewProjectClick={saveNewProjectClick}
            users={users}
          />
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
