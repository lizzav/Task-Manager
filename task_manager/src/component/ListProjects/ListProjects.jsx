import React from "react";
import "./ListProjects.scss";
import { NavLink } from "react-router-dom";
import GetUsers from "../GetUsers";

function ListProjects({ projects, slice }) {
  return (
    <div className="projects-list">
      {projects.slice(0, slice ? slice : projects.length).map(project => (
        <NavLink
          to={`/projects/${project.id}`}
          className="projects-list__item"
          key={project.id}
        >
          <div className="projects-list__item__title">{project.name}</div>

          {project.status === 1 && (
            <div className="status-active">Активный</div>
          )}
          {project.status === 2 && (
            <div className="status-stop">Приостановлен</div>
          )}
          {project.status === 3 && (
            <div className="status-complete">Завершен</div>
          )}

          <GetUsers projectUsers={project.users} />
        </NavLink>
      ))}
    </div>
  );
}

export default ListProjects;
