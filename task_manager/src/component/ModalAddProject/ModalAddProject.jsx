import React, { useCallback, useState } from "react";
import "./ModalAddProject.scss";

import Button from "../Button";
import { sendProject } from "../../redux/projects-reducer";
import { connect } from "react-redux";
import { ReactComponent as Closed } from "../../svg/closed.svg";

let mapStateToProps = state => {
  return {
    state: state.main
  };
};

function ModalAddProject(props) {
  const [nameProject, setNameProject] = useState("");
  const [descriptionProject, setDescriptionProject] = useState("");
  const handleProjectNameChange = useCallback(
    event => setNameProject(event.target.value),
    []
  );
  const handleProjectDescriptionChange = useCallback(
    event => setDescriptionProject(event.target.value),
    []
  );
  const saveNewProjectClick = () => {
    props.sendProject(nameProject, descriptionProject);
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
            <div className="modal-project__title">Создание проекта</div>
            <Closed onClick={() => props.setActive(false)} />
          </div>

          <div>Название</div>
          <input
            className="modal-project__input"
            placeholder="Введите название проекта"
            onChange={handleProjectNameChange}
            value={nameProject}
          />
          <div>Описание</div>
          <input
            className="modal-project__input"
            placeholder="Введите описание проекта"
            onChange={handleProjectDescriptionChange}
            value={descriptionProject}
          />
          <div className="modal-project__button">
            {nameProject ? (
              <div onClick={saveNewProjectClick}>
                <Button text="Добавить" type="add-task" color="blue" />
              </div>
            ) : (
              <Button
                text="Добавить"
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

export default connect(mapStateToProps, { sendProject })(ModalAddProject);
