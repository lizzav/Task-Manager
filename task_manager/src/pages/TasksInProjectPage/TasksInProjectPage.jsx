import React, { useState, useCallback } from "react";
import "./TasksInProjectPage.scss";
import { ReactComponent as File } from "../../svg/file.svg";
import { ReactComponent as Add } from "../../svg/add.svg";
import { ReactComponent as Star } from "../../svg/Star.svg";
import { ReactComponent as Edit } from "../../svg/edit.svg";
import { ReactComponent as Ellipsis } from "../../svg/ellipsis.svg";
import { ReactComponent as Closed } from "../../svg/closed.svg";

import Button from "../../component/Button";
import ModalInfoTasks from "../../component/ModalInfoTasks";
import ModalAddStatus from "../../component/ModalAddStatus";

const lists = {
  id: 1,
  name: "shops",
  tasks: [
    {
      id: 1,
      name:
        "shopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshopsshops",
      status: 1,
      description:"блаблабла",
      tags: [
        { id: 1, name: "disigner" },
        { id: 2, name: "error" }
      ],
      file: [123, 45],
      users: [
        { id: 1, name: "d" },
        { id: 2, name: "e" }
      ]
    },
    {
      id: 145,
      name: "shops",
      status: 1,
      tags: [
        { id: 1, name: "disigner10" },
        { id: 2, name: "disigner10" },

        { id: 22, name: "error" },
        { id: 42, name: "error" },
        { id: 62, name: "error" },

        { id: 14, name: "disigner" },
        { id: 23, name: "error" },
        { id: 44, name: "error" },
        { id: 64, name: "error" },

        { id: 15, name: "disigner" },
        { id: 25, name: "error" },
        { id: 45, name: "error" },
        { id: 65, name: "error" }
      ],
      file: [
        { id: 15, name: "disigner" },
        { id: 25, name: "error" },
        { id: 45, name: "error" },
        { id: 65, name: "error" }
      ],
      users: [
        { id: 1, name: "d" },
        { id: 2, name: "e" }
      ]
    }
  ],
  status: [
    { id: 1, name: "status1" },
    { id: 2, name: "status2" }
  ],
  user: [
    { id: 1, name: "D" },
    { id: 2, name: "D" },
    { id: 3, name: "H" },
    { id: 4, name: "E" }
  ],
  favorites: false
};

function TasksInProjectPage() {
  const [list, setList] = useState(lists);
  const [listTasks, setListTasks] = useState(lists.tasks);
  const [favorites, setFavorites] = useState(lists.favorites);
  const [status, setStatus] = useState(lists.status);
  const [statusEditValue, setStatusEditValue] = useState("");
  const [visibleAddTask, setVisibleAddTask] = useState(false);
  const [addTaskTitle, setAddTaskTitle] = useState("");
  const [visibleTasks, setVisibleTasks] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [visibleListsAction, setVisibleListsAction] = useState(false);
  const [visibleAddStatus, setVisibleAddStatus] = useState(false);
  const handleAddTaskTitleChange = useCallback(
    event => setAddTaskTitle(event.target.value),
    []
  );

  const submitTask = id => event => {
    event.preventDefault();
    const newList = {
      id: Math.random(),
      name: addTaskTitle,
      status: id
    };
    setListTasks([...listTasks, newList]);
    setAddTaskTitle("");
    setVisibleAddTask(false);
  };
  const addStatus = name => event => {
    event.preventDefault();
    const newStatus = {
      id: Math.random(),
      name: name
    };
    setStatus([...status, newStatus]);
    setVisibleAddStatus(false);
  };
  const openTasks = id => {
    const Task = listTasks.filter(item => item.id === id);

    setVisibleTasks(Task[0].id);
  };
  const handleStatusChange = useCallback(
    event => setStatusEditValue(event.target.value),
    []
  );

  const onChangeStatus = id => event => {
    event.preventDefault();
    const idx = status.findIndex(el => el.id === id);
    const oldItem = status[idx];
    const newItem = { ...oldItem, name: statusEditValue };
    const newArray = [
      ...status.slice(0, idx),
      newItem,
      ...status.slice(idx + 1)
    ];
    setStatus(newArray);
    setEditStatus(false);
    setStatusEditValue("");
  };
  const deleteList = id => {
    const idx = status.findIndex(el => el.id === id);
    const newArray = [...status.slice(0, idx), ...status.slice(idx + 1)];
    setStatus(newArray);
    setVisibleListsAction("");
  };
  const copyList = id => {
    const idx = status.findIndex(el => el.id === id);
    const oldItem = status[idx];
    const newItem = { ...oldItem, id: Math.random() };

    const newArray = [
      ...status.slice(0, idx),
      oldItem,
      newItem,
      ...status.slice(idx + 1)
    ];
    setStatus(newArray);
    setVisibleListsAction("");
  };

  const editDescriptionTask=(id,description)=>{
    const idx = listTasks.findIndex(el => el.id === id);
    const oldItem = listTasks[idx];
    const newItem = { ...oldItem, description:description };
    const newArray = [
      ...listTasks.slice(0, idx),
      newItem,
      ...listTasks.slice(idx + 1)
    ];
    setListTasks(newArray);

  };
  const editTitleTaskF=(id,name)=>{
    const idx = listTasks.findIndex(el => el.id === id);
    const oldItem = listTasks[idx];
    const newItem = { ...oldItem, name:name };
    const newArray = [
      ...listTasks.slice(0, idx),
      newItem,
      ...listTasks.slice(idx + 1)
    ];
    setListTasks(newArray);

  };
  return (
    <div>
      <div className="header__project_list">
        <div className="header__project_list__title">
          <div className="header__project_list__title-name">{list.name}</div>

          <div
            className={`header__project_list__title-svg-${favorites}`}
            onClick={() => setFavorites(!favorites)}
          >
            <Star />
          </div>
        </div>

        <div className="header__project_list__users">
          Участники:
          {list.user &&
            list.user.map(user => (
              <div className="header__project_list__users-item" key={user.id}>
                {user.name}
              </div>
            ))}
          <div className="header__project_list__users-add">
            <Add />
          </div>
        </div>
      </div>
      <div className="lists">
        {status.map(statusArr => (
          <div className="lists__list" key={statusArr.id}>
            <div className="lists__list__header">
              {editStatus === statusArr.id ? (
                <div>
                  <div
                    onClick={statusEditValue && onChangeStatus(statusArr.id)}
                    className="bg-close"
                  />
                  <input
                    className="lists__list__edit"
                    onClick={e => e.stopPropagation()}
                    onChange={handleStatusChange}
                    autoComplete="off"
                    placeholder="Название раздела"
                    name="txt"
                    type="text"
                    value={statusEditValue}
                  />
                </div>
              ) : (
                <div
                  className="lists__list-title"
                  onClick={() =>
                    setEditStatus(statusArr.id) ||
                    setStatusEditValue(statusArr.name)
                  }
                >
                  {statusArr.name.length > 21
                    ? `${statusArr.name.substring(0, 20)}...`
                    : statusArr.name}
                </div>
              )}
              <Ellipsis onClick={() => setVisibleListsAction(statusArr.id)} />
            </div>
            {visibleListsAction === statusArr.id && (
              <div>
                <div
                  onClick={() => setVisibleListsAction(false)}
                  className="bg-close"
                />
                <div
                  className="modal-action-list"
                  onClick={e => e.stopPropagation()}
                >
                  <div
                    className="modal-action-list__closed"
                    onClick={() => setVisibleListsAction(false)}
                  >
                    <Closed />
                  </div>
                  <div className="modal-action-list__title">
                    Действия со списком
                  </div>

                  <div
                    className="modal-action-list__item"
                    onClick={() => copyList(statusArr.id)}
                  >
                    Копировать список
                  </div>
                  <div
                    className="modal-action-list__item"
                    onClick={() => deleteList(statusArr.id)}
                  >
                    Удалить список
                  </div>
                  <div
                    className="modal-action-list__item"
                    onClick={() =>
                      setEditStatus(statusArr.id) ||
                      setStatusEditValue(statusArr.name) ||
                      setVisibleListsAction(false)
                    }
                  >
                    Переименовать список
                  </div>
                </div>
              </div>
            )}
            <div className="lists__list-tasks">
              {listTasks
                .filter(item => item.status === statusArr.id)
                .map(taskOnList => (
                  <div
                    className="lists__list-tasks__task"
                    onClick={() => openTasks(taskOnList.id)}
                    key={taskOnList.id}
                  >
                    <div className="lists__list-tasks__task__title">
                      <div>
                        {taskOnList.name.length > 25
                          ? `${taskOnList.name.substring(0, 25)}...`
                          : taskOnList.name}
                      </div>
                      <div className="lists__list-tasks__task-edit">
                        <Edit />
                      </div>
                    </div>
                    {taskOnList.tags && (
                      <div className="lists__list-tasks__task__tags">
                        {taskOnList.tags.length < 5
                          ? taskOnList.tags.map(tags => (
                              <div
                                key={tags.id}
                                className="lists__list-tasks__task__tags-item"
                              >
                                {tags.name.length > 8
                                  ? `${tags.name.substring(0, 5)}...`
                                  : tags.name}
                              </div>
                            ))
                          : taskOnList.tags.slice(0, 4).map(tags => (
                              <div
                                key={tags.id}
                                className="lists__list-tasks__task__tags-item"
                              >
                                {tags.name.length > 8
                                  ? `${tags.name.substring(0, 5)}...`
                                  : tags.name}
                              </div>
                            ))}
                      </div>
                    )}
                    {taskOnList.file && (
                      <div className="lists__list-tasks__task__file">
                        {taskOnList.file[0].name}
                      </div>
                    )}

                    {(taskOnList.users || taskOnList.file) && (
                      <div className="lists__list-tasks__task__bottom">
                        {taskOnList.users && (
                          <div className="lists__list-tasks__task__users">
                            {taskOnList.users.map(users => (
                              <div
                                key={users.id}
                                className="lists__list-tasks__task__users-item"
                              >
                                {users.name}
                              </div>
                            ))}
                          </div>
                        )}
                        {taskOnList.file && (
                          <div className="lists__list-tasks__task__bottom__file">
                            {taskOnList.file.length}
                            <File />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
            {visibleAddTask === statusArr.id && (
              <div>
                <div
                  onClick={() =>
                    setAddTaskTitle("") || setVisibleAddTask(false)
                  }
                  className="bg-close"
                />
                <form
                  className="lists__list__add-task__popup"
                  onSubmit={submitTask(statusArr.id)}
                  onClick={e => e.stopPropagation()}
                >
                  <input
                    className="lists__list__add-task__popup__input"
                    autoComplete="off"
                    placeholder="Название задачи"
                    name="txt"
                    type="text"
                    value={addTaskTitle}
                    onChange={handleAddTaskTitleChange}
                  />
                  <div className="lists__list__add-task__popup__bottom">
                    {addTaskTitle ? (
                      <Button text="Добавить" type="add-task" color="blue" />
                    ) : (
                      <Button
                        text="Добавить"
                        type="add-task"
                        color="blue"
                        noActive={true}
                      />
                    )}
                    <Closed
                      onClick={() =>
                        setAddTaskTitle("") || setVisibleAddTask(false)
                      }
                    />
                  </div>
                </form>
              </div>
            )}

            <div
              className="lists__list__add-task"
              onClick={() =>
                visibleAddTask
                  ? setVisibleAddTask(false)
                  : setVisibleAddTask(statusArr.id)
              }
            >
              <Add />
              Добавить задачу
            </div>
          </div>
        ))}
        {visibleAddStatus ? (
          <div>
            <ModalAddStatus
              active={visibleAddStatus}
              setActive={setVisibleAddStatus}
              addStatus={addStatus}
            />
          </div>
        ) : (
          <div
            className="lists__add-list"
            onClick={() => setVisibleAddStatus(true)}
          >
            <Add />
          </div>
        )}
      </div>
      <div>
        {visibleTasks && (
          <div>
            <ModalInfoTasks
              active={listTasks.filter(item => item.id === visibleTasks)[0]}
              setActive={setVisibleTasks}
              status={status}
              editDescriptionTask={editDescriptionTask}
              editTitleTaskF={editTitleTaskF}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksInProjectPage;
