import React, { useState, useCallback } from "react";
import "./TasksInProjectPage.scss";
import { ReactComponent as File } from "../../svg/file.svg";
import { ReactComponent as Add } from "../../svg/add.svg";
import { ReactComponent as Star } from "../../svg/Star.svg";
import { ReactComponent as Edit } from "../../svg/edit.svg";
import { ReactComponent as Ellipsis } from "../../svg/ellipsis.svg";
import { ReactComponent as Closed } from "../../svg/closed.svg";
import { useRouteMatch } from "react-router";

import Button from "../../component/Button";
import ModalInfoTasks from "../../component/ModalInfoTasks";
import ModalAddStatus from "../../component/ModalAddStatus";
import Header from "../../component/Header";
import { connect } from "react-redux";
import {
  addListCreator,
  copyListCreator, deleteListCreator,
  isFavouriteCreator, sendTaskCreator,
  updateDescriptionTitleCreator, updateListCreator,
  updateTasksTitleCreator
} from "../../redux/projects-reducer";

let mapStateToProps = state => {
  return {
    state: state.main
  };
};

let mapDispatchToProps = dispatch => {
  return {
    updateTaskTitle: (newArray, idx) => {
      dispatch(updateTasksTitleCreator(newArray, idx));
    },
    updateFavorite: id => {
      dispatch(isFavouriteCreator(id));
    },
    updateTasksDescription: (id, description) => {
      dispatch(updateDescriptionTitleCreator(id, description));
    },
    copyList: (projectId, statusId) => {
      dispatch(copyListCreator(projectId, statusId));
    },
    deleteList:(projectId, statusId) => {
      dispatch(deleteListCreator(projectId, statusId));
    },
    updateList:(projectId, statusId,name)=>{
      dispatch(updateListCreator(projectId, statusId,name))
    },
    addList: (projectId,name)=>{
      dispatch(addListCreator(projectId,name))
    },
sendTask:(projectId, statusId,name)=>{
      dispatch(sendTaskCreator(projectId, statusId,name))
}
  };
};

function TasksInProjectPage(props) {
  const { params } = useRouteMatch("/projects/:id");
  const listTasks = props.state.tasks.filter(
    task => task.projectId === parseInt(params.id)
  );
  const project = props.state.projects.filter(
    project => project.id === parseInt(params.id)
  );
const status=project[0].status;
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
    props.sendTask(params.id,id,addTaskTitle);
    setAddTaskTitle("");
    setVisibleAddTask(false);
  };
  const addStatus = name => event => {
    event.preventDefault();
    props.addList(params.id,name);
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
    props.updateList(params.id,id,statusEditValue);
    setEditStatus(false);
    setStatusEditValue("");
  };
  const deleteList = id => {
   props.deleteList(params.id,id);
    setVisibleListsAction("");
  };
  const copyLists = id => {
    props.copyList(params.id,id);

    setVisibleListsAction("");
  };

  const editDescriptionTask = (id, description) => {
    props.updateTasksDescription(id, description);
  };
  const editTitleTaskF = (id, name) => {
    props.updateTaskTitle(id, name);
  };
  return (
    <div>
      <Header />

      <div className="header__project_list">
        <div className="header__project_list__title">
          <div className="header__project_list__title-name">
            {project[0].name}
          </div>

          <div
            className={`header__project_list__title-svg-${project[0].isFavorite}`}
            onClick={() => props.updateFavorite(params.id)}
          >
            <Star />
          </div>
        </div>

        <div className="header__project_list__users">
          Участники:
          {project[0].users &&
            project[0].users.map(user => (
              <div className="header__project_list__users-item" key={user.id}>
                {user.name.substring(0, 1)}
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
                    onClick={() => copyLists(statusArr.id)}
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
                .filter(item => item.statusId === statusArr.id)
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
                        {taskOnList.tags.slice(0, 4).map(tagsId =>
                          props.state.tags.map(
                            tags =>
                              tags.id === tagsId && (
                                <div
                                  key={tags.id}
                                  className="lists__list-tasks__task__tags-item"
                                >
                                  {tags.name.length > 8
                                    ? `${tags.name.substring(0, 5)}...`
                                    : tags.name}
                                </div>
                              )
                          )
                        )}
                      </div>
                    )}
                    {taskOnList.file && (
                      <div className="lists__list-tasks__task__file">
                        {taskOnList.file[0]}
                      </div>
                    )}

                    {(taskOnList.users || taskOnList.file) && (
                      <div className="lists__list-tasks__task__bottom">
                        {taskOnList.users && (
                          <div className="lists__list-tasks__task__users">
                            {project[0].users.map(user =>
                              taskOnList.users.map(
                                userId =>
                                  user.id === userId && (
                                    <div
                                      key={user.id}
                                      className="lists__list-tasks__task__users-item"
                                    >
                                      {user.name.substring(0, 1)}
                                    </div>
                                  )
                              )
                            )}
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
              users={project[0].users}
              tags={props.state.tags}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksInProjectPage);
