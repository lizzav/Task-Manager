import React from "react";
import "./ButtonForModalBottom.scss";
import Button from "../Button";

function ButtonForModalBottom({
  propsTask,
  setActive,
  deleteTaskf,
  name,
  description,
  users,
  saveNewProjectClick
}) {
  return (
    <div className="modal-task__button">
      {!propsTask.name ? (
        <div onClick={() => setActive(false)}>
          <Button text="Удалить" type="add-task" color="rad" />
        </div>
      ) : (
        <div onClick={() => deleteTaskf()}>
          <Button text="Удалить" type="add-task" color="rad" />
        </div>
      )}

      {name.inputValid && !description.maxLengthError && users ? (
        <div onClick={saveNewProjectClick}>
          <Button text="Сохранить" type="add-task" color="blue" />
        </div>
      ) : (
        <Button text="Сохранить" type="add-task" color="blue" noActive={true} />
      )}
    </div>
  );
}

export default ButtonForModalBottom;
