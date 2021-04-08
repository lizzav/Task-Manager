import React from "react";
import "./ModalInfoTasks.scss";

import { ReactComponent as Closed } from "../../svg/closed.svg";

function ModalInfoTasks({ active, setActive }) {
  return (
    <div className="task-info" onClick={() => setActive(false)}>
      <div className="task-info__content" onClick={e => e.stopPropagation()}>
        <div className="task-info__content__header">
          <div className="task-info__content__header-title">{active.name}</div>
          <div className="task-info__content__header-list">
            Находится в списке “{active.status}”
          </div>
        </div>
        <div className="task-info__content__description">
          Описание <input />
        </div>
        <div className="task-info__content__tags">
          <div className="task-info__content__tags-title">Метки</div>
          <div className="task-info__content__tags__content">
            {active.tags &&
              active.tags.map(tag => (
                <div
                  className="task-info__content__tags__content-item"
                  key={tag.id}
                >
                  {tag.name}
                </div>
              ))}
          </div>
        </div>
        <div className="task-info__content__users">
          Участники <input />
        </div>
        <div className="task-info__content__file">
          Вложения
          {active.file ? (
            <div className="task-info__content__file__container">
              {active.file.map(file => (
                <div key={file.id}>{file.name}</div>
              ))}
            </div>
          ) : (
            <div>Вложений нет</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalInfoTasks;
