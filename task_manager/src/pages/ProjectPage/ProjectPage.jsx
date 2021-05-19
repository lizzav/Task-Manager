import React from "react";

import "./ProjectPage.scss";
import Menu from "../../component/Menu";

import { NavLink } from "react-router-dom";
import { ReactComponent as Star } from "../../svg/Star.svg";
import Header from "../../component/Header";
import { connect } from "react-redux";
import Users from "../../component/Users/Users";

let mapStateToProps = state => {
  return {
    state: state.main,
    users: state.users.users
  };
};

function ProjectPage(props) {
  return (
    <div className="project-page">
      <div>
        <Header />
        <Menu />
      </div>
      {console.log(props.state.projects)}
      <div className="project-page__content">
        <div className="project-page__content-title">Все проекты</div>
        <div>
          <div>
            <div className="project-page__project-header">
              <div>Название</div>
              <div>Описание</div>
              <div>Участники</div>
              <div>Руководитель</div>
            </div>
            {props.state.projects &&
              props.state.projects.map(projects => (
                <NavLink
                  to={`/projects/${projects.id}`}
                  className="project-page__project"
                  key={projects.id}
                >
                  <div className="project-page__project-title project-page__project-border">
                    <div className="project-page__project-star">
                      {projects.isFavorite === true && <Star />}
                    </div>
                    {projects.name}
                  </div>
                  <div className="project-page__project-description project-page__project-border">
                    {projects.description}
                  </div>

                  <div className="project-page__project-border">
                    <Users userIdArray={projects.users} count={10} />
                  </div>
                  <div className="project-page__project-border">
                    <Users
                      userIdArray={projects.author}
                      count={10}
                      userName={true}
                      size={"bold"}
                    />
                  </div>
                </NavLink>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(ProjectPage);
