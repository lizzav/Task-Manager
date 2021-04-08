import React, { useState, useCallback } from "react";
import "./ModalAddStatus.scss";
import Button from "../Button";

import { ReactComponent as Closed } from "../../svg/closed.svg";

function ModalAddStatus({ active, setActive, addStatus }) {

  const [statusValue, setStatusValue] = useState("");
  const handleStatusChange = useCallback(
    event => setStatusValue(event.target.value),
    []
  );

  return (
    <div className="modal-status" onClick={() => setActive(false)}>
      <div onClick={() => setActive(false)} className="bg-close" />
      <form
        onClick={e => e.stopPropagation()}
        className="modal-status-content__popup"
        onSubmit={addStatus(statusValue)}
      >
        <input
          className="modal-status-content__popup__input"
          autoComplete="off"
          placeholder="Название раздела"
          name="txt"
          type="text"
          onChange={handleStatusChange}
          value={statusValue}
        />
        <div className="modal-status-content__popup__bottom">
          {statusValue ? (
            <Button text="Готово" type="add-task" color="green" />
          ) : (
            <Button
              text="Готово"
              type="add-task"
              color="green"
              noActive={true}
            />
          )}
          <Closed onClick={() => setActive(false)} />
        </div>
      </form>
    </div>
  );
}

export default ModalAddStatus;
