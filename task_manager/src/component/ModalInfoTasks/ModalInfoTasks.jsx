import React, { useState, useCallback } from "react";
import "./ModalInfoTasks.scss";
import { ReactComponent as Edit } from "../../svg/edit.svg";
import Button from "../Button";
import Users from "../Users/Users";
import ModalComponent from "../ModalComponent/ModalComponent";

function ModalInfoTasks({
  active,
  setActive,
  status,
  editDescriptionTask,
  editTitleTaskF,
  users,
  tags,
  deleteTask
}) {
  const [editDescription, setEditDescription] = useState(false);
  const [editTitleTask, setEditTitleTask] = useState(false);
  const [editTitleTaskValue, setEditTitleTaskValue] = useState(false);
  const [editNameTags, setEditNameTags] = useState(false);
  const [visibleAddTags, setVisibleAddTags] = useState(false);
  const description = () => {
    return active.description ? active.description : "";
  };
  const [editDescriptionValue, setEditDescriptionValue] = useState(description);
  const handleDescriptionValueChange = useCallback(
    event => setEditDescriptionValue(event.target.value),
    []
  );
  const closeEditDescriptionTask = () => {
    editDescriptionTask(active.id, editDescriptionValue);
    setEditDescription(false);
  };
  const handleTitleTaskChange = useCallback(
    event => setEditTitleTaskValue(event.target.value),
    []
  );
  const closeEditTitleTask = () => {
    editTitleTaskF(active.id, editTitleTaskValue);
    setEditTitleTask(false);
  };
  return (
    <div>
      {" "}
      {active && (
        <div className="task-info" onClick={() => setActive(false)}>
          <div
            className="task-info__content"
            onClick={e => e.stopPropagation()}
          >
            <div className="task-info__content__header">
              <div className="task-info__content__header-title">
                {editTitleTask ? (
                  <div>
                    <div onClick={closeEditTitleTask} className="bg-close" />
                    <input
                      className="task-info__content__header-title__edit"
                      onClick={e => e.stopPropagation()}
                      onChange={handleTitleTaskChange}
                      autoComplete="off"
                      placeholder="Название задачи"
                      name="txt"
                      type="text"
                      value={editTitleTaskValue}
                    />
                  </div>
                ) : (
                  <div
                    className="task-info__content__header-title-txt"
                    onClick={() =>
                      setEditTitleTask(active.id) ||
                      setEditTitleTaskValue(active.name)
                    }
                  >
                    {active.name.length > 60
                      ? `${active.name.substring(0, 60)}...`
                      : active.name}
                    <div className="task-info__content-edit">
                      <Edit />
                    </div>
                  </div>
                )}
              </div>
              <div className="task-info__content__header-sub">
                {" "}
                <div className="task-info__content__header-list">
                  Находится в списке “
                  {status.filter(item => item.id === active.statusId)[0].name}”
                </div>
                <div
                  className="task-info__content__header-delete"
                  onClick={() => deleteTask(active.id) && setActive(false)}
                >
                  Удалить
                </div>
              </div>
            </div>
            <div className="task-info__content__description">
              <div className="task-info__content__description-header">
                Описание
                {editDescription ? (
                  <div onClick={closeEditDescriptionTask}>
                    <Button
                      text="Сохранить"
                      type="add-description-task"
                      color="blue"
                    />
                  </div>
                ) : (
                  <div
                    className="task-info__content-edit"
                    onClick={() => setEditDescription(true)}
                  >
                    <Edit />
                  </div>
                )}
              </div>
              {editDescription ? (
                <textarea
                  className="task-info__content__description-input"
                  value={editDescriptionValue}
                  onChange={handleDescriptionValueChange}
                  placeholder="Добавьте текст описания задачи...."
                />
              ) : (
                <textarea
                  className="task-info__content__description-input"
                  value={active.description}
                  disabled
                  placeholder="Добавьте текст описания задачи...."
                />
              )}
            </div>
            <div className="task-info__content__tags">
              <div className="task-info__content__tags-title">
                <div>Метки</div>
                <div className="task-info__content-edit" onClick={()=> setVisibleAddTags(true)}>
                  <Edit />
                </div>
              </div>
              {active.tags && (
                <div className="task-info__content__tags__content">
                  {active.tags &&
                    active.tags.map(tagsId => (
                      <div key={`${Math.random()}${tagsId}`}>
                        {tags.map(
                          tag =>
                            tag.id === tagsId && (
                              <div
                                key={tag.id}
                                className="task-info__content__tags__content-item"
                              >
                                {tag.name}
                              </div>
                            )
                        )}
                      </div>
                    ))}
                </div>
              )}
              {visibleAddTags && (
              <ModalComponent
                addTags
                editNameTags={editNameTags}
                setEditNameTags={setEditNameTags}
                tag={active.tags}
                active={visibleAddTags}
                setActive={setVisibleAddTags}
              />
            )}
            {editNameTags && (
              <ModalComponent
                updateTags
                id={editNameTags}
                active={editNameTags}
                setActive={setEditNameTags}
                setOldForm={setVisibleAddTags}
                oldForm={visibleAddTags}
              />
            )}
            </div>
            <div className="task-info__content__users">
              <div className="task-info__content__users-title">
                <div>Участники</div>
                <div className="task-info__content-edit">
                  <Edit />
                </div>
              </div>
              <div className="task-info__content__users-container">
                <Users userIdArray={active.users} count={100} />
              </div>
            </div>
            <div className="task-info__content__file">
              <div>Вложения</div>
              {active.file ? (
                <div className="task-info__content__file__container">
                  {active.file.map(file => (
                    <div key={file}>
                      {console.log(file)}
                      {file.name}
                    </div> //file.id
                  ))}
                </div>
              ) : (
                <div>Вложений нет</div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default ModalInfoTasks;
