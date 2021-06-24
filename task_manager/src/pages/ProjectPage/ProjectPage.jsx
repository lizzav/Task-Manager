import React, { useState } from "react";

import "./ProjectPage.scss";
import "../MainPage/MainPage.scss";
import Menu from "../../component/Menu";

import { NavLink, Redirect } from "react-router-dom";
import { ReactComponent as Star } from "../../svg/Star.svg";
import Header from "../../component/Header";
import { connect } from "react-redux";
import Users from "../../component/Users/Users";
import Button from "../../component/Button";
import ModalAddProject from "../../component/ModalAddProject/ModalAddProject";

let mapStateToProps = state => {
  return {
    state: state.main,
    users: state.users.users,
    user: state.users.profile.id
  };
};

function ProjectPage(props) {
  const [visibleAddProject, setVisibleAddProject] = useState(false);

  if (!props.user) return <Redirect to={"/login"} />;
  return (
    <div className="main-page">
      <div>
        <Header />
        <Menu />
      </div>

      <div>
        <div className="main-page__content">
          <div className="main-page__content-title project__title">
            <div>Мои проекты</div>
            <div onClick={() => setVisibleAddProject(true)}>
              {" "}
              <Button text="Добавить проект" type="add-task" color="blue" />
            </div>
          </div>
          <div className="main-page__content__projects">
            {props.state.projects.map(project => (
              <NavLink
                to={`/projects/${project.id}`}
                className="main-page__content__project"
                key={project.id}
              >
                <div className="main-page__content__project-title">
                  {project.name}
                </div>
                {project.status === 1 && (
                  <div className="status-active">Активный</div>
                )}
                {project.status === 2 && (
                  <div className="status-stop">Приостановлен</div>
                )}
                {project.status === 3 && (
                  <div className="status-complete">Завершен</div>
                )}
                <div className="main-page__content__project-item">
                  {project.users &&
                    project.users.map(usersId => (
                      <div key={`${Math.random()}${usersId}`}>
                        {props.users.map(
                          user =>
                            user.id === usersId && (
                              <div
                                key={user.id}
                                className="main-page__content__project-item-user"
                              >
                                <Users
                                  userIdArray={user.name.substring(0, 1)}
                                />
                              </div>
                            )
                        )}
                      </div>
                    ))}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      {visibleAddProject && (
        <ModalAddProject
          active={visibleAddProject}
          setActive={setVisibleAddProject}
          project
        />
      )}
    </div>
  );
}

export default connect(mapStateToProps)(ProjectPage);
