import React from "react";

import "./MainPage.scss";
import Menu from "../../component/Menu";

import { NavLink} from "react-router-dom";
import { ReactComponent as Star } from "../../svg/Star.svg";
import Header from "../../component/Header";
import { connect } from "react-redux";
import { sendProjectCreator } from "../../redux/projects-reducer";

let mapStateToProps = state => {
  return {
    state: state.main
  };
};
let mapDispatchToProps = dispatch => {
  return {
    sendMessage: name => {
      dispatch(sendProjectCreator(name));
    }
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
              <NavLink to={`/projects/${project.id}`} className="main-page__content__project" key={project.id}>
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

                    {project.author &&
                    project.author.slice(0, 2).map(user => (
                      <div
                        className="main-page__content__project-item__user"
                        key={user.id}
                      >
                        {user.name.substring(0, 1)}
                      </div>
                    ))}
                  </div>
                <div className="main-page__content__project-item">
                  <div>Участники&ensp;</div>
                  {project.users &&
                    project.users.slice(0, 3).map(user => (
                      <div
                        className="main-page__content__project-item__user"
                        key={user.id}
                      >
                        {user.name.substring(0, 1)}
                      </div>
                    ))}
                  {project.users && project.users.length > 3 && (
                    <div className="main-page__content__project-item__more-user">{`+${project
                      .users.length - 3}`}</div>
                  )}
                </div>
              </NavLink>
            ))}
          </div>
          <div className="main-page__content-title">Последние действия</div>
          <div className="main-page__content__action">
            <div className="main-page__content__action-item">
              <div className="main-page__content__project-item__user">A</div>
              <div>
                &ensp; Имя Фамилия добавила новую задачу на доску{" "}
                <u>Название</u>{" "}
              </div>
            </div>
            <div className="main-page__content__action-item">
              <div className="main-page__content__project-item__user">A</div>
              <div>
                Имя Фамилия добавила новую задачу на доску <u>Название</u>{" "}
              </div>
            </div>
            <div className="main-page__content__action-item">
              <div className="main-page__content__project-item__user">A</div>
              <div>
                Имя Фамилия добавила новую задачу на доску <u>Название</u>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

export default MainPageContainer;
