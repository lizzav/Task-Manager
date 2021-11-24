import React from "react";
import "./ProjectInfo.scss";
import Users from "../Users/Users";
import GetUsers from "../GetUsers/GetUsers";

function ProjectInfo({ project, users }) {
  return (
    <div className="lists__description">
      <div className="lists__description-status lists__description-title">
        <div className="lists__description-title-status">Статус:</div>
        {project.status === 1 && (
          <div className="main-page__content__project__status-active">
            Активный
          </div>
        )}
        {project.status === 2 && (
          <div className="main-page__content__project__status-stop">
            Приостановлен
          </div>
        )}
        {project.status === 3 && (
          <div className="main-page__content__project__status-complete">
            Завершен
          </div>
        )}
      </div>

      <div className="lists__description-description">
        <div className="lists__description-title">Описание:</div>
        <div>{project.description}</div>
      </div>
      <div>
        <div className="lists__description-title"> Создатель:</div>

        {users.map(
          user =>
            user.id === project.author && (
              <div className="lists__description__user" key={user.id}>
                <div className="main-page__content__project-item-user lists__description__user-icon">
                  <Users userIdArray={user.name.substring(0, 1)} />
                </div>
                {user.name}
              </div>
            )
        )}
      </div>
      <div>
        <div className="lists__description-title"> Команда:</div>
        <GetUsers projectUsers={project.users} />
      </div>
    </div>
  );
}

export default ProjectInfo;
