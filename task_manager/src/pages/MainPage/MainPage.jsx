import React from "react";
import "./MainPage.scss";
import Menu from "../../component/Menu";
import { NavLink } from "react-router-dom";
import { ReactComponent as Star } from "../../svg/Star.svg";
import Header from "../../component/Header";
import { connect } from "react-redux";
import Users from "../../component/Users";

let mapStateToProps = state => {
  return {
    state: state.main,
    users: state.users.users
  };
};

function MainPage(props) {
  return (
    <div className="main-page">
      <div>
        <Header />
        <Menu />
      </div>

      <div>
        <div className="main-page__content">
          <div className="main-page__content-title">Последние проекты</div>
          <div className="main-page__content__projects">
            {props.state.projects.map(project => (
              <NavLink
                to={`/projects/${project.id}`}
                className="main-page__content__project"
                key={project.id}
              >
                <div className="main-page__content__project-title">
                  <div className="main-page__content__project-title-svg">
                    {project.isFavorite === true && <Star />}
                  </div>
                  {project.name}
                </div>
                <div className="main-page__content__project-item">
                  Описание:
                  {project.description && project.description.length > 15
                    ? `${project.description.substring(0, 12)}...`
                    : project.description}
                </div>
                <div className="main-page__content__project-item">
                  <div>Руководитель&ensp;</div>
                  <Users userIdArray={project.author} count={3} />
                </div>
                <div className="main-page__content__project-item">
                  <div>Участники&ensp;</div>

                  <Users userIdArray={project.users} count={3} more={3} />
                </div>
              </NavLink>
            ))}
          </div>
          <div className="main-page__content-title">Последние действия</div>
          <div className="main-page__content__action">
            {console.log(props.state.newAction)}
            {props.state.newAction &&
              props.state.newAction.map(action => (
                <div
                  className="main-page__content__action-item"
                  key={action.id}
                >
                  {console.log(action, "action")}
                  <Users
                    userIdArray={[action.users]}
                    count={1}
                    userName={true}
                  />
                  {props.state.actions.map(
                    act =>
                      act.id === action.type && (
                        <div key={act.id}>{act.name} &nbsp;</div>
                      )
                  )}
                  {props.state.projects.map(
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(MainPage);
