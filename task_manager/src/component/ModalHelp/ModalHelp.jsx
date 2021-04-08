import React, { useState, useCallback } from "react";
import "./ModalHelp.scss";

import { ReactComponent as Closed } from "../../svg/closed.svg";

function ModalHelp({ active, setActive }) {

  return (
    <div>
      <div className="modal-help" onClick={() => setActive(false)}>
        <div className="modal-help-content" onClick={e => e.stopPropagation()}>
          <div
            className="modal-help-content__closed"
            onClick={() => setActive(false)}
          >
            <Closed />
          </div>
          <div className="modal-help-content__title">Справка </div>
          <div className="modal-help-content__menu">
            <div className="modal-help-content__item">Помощь</div>
            <div className="modal-help-content__item">Условия пользования</div>
            <div className="modal-help-content__item">
              Политика конфиденциальности
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalHelp;
