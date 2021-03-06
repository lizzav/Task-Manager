import React, { useState } from "react";
import "./TasksInProjectPage.scss";
import { ReactComponent as Edit } from "../../svg/edit.svg";
import { ReactComponent as Closed } from "../../svg/closed.svg";
import { useRouteMatch } from "react-router";

import Button from "../../component/Button";
import Header from "../../component/Header";
import { connect } from "react-redux";
import {
  addList,
  copyList,
  isFavourite,
  sendTask,
  updateDescriptionTitle,
  updateList,
  updateStatusTask,
  deleteTask,
  deleteProject
} from "../../redux/projects-reducer";
import Users from "../../component/Users/Users";
import { Redirect } from "react-router-dom";
import Menu from "../../component/Menu";
import ModalAddTask from "../../component/ModalAddTask";
import ModalAddProject from "../../component/ModalAddProject";

let mapStateToProps = state => {
  return {
    state: state.main,
    users: state.users.users,
    user: state.users.profile.id
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

  const [visibleAddTask, setVisibleAddTask] = useState(false);
  const [visibleTasks, setVisibleTasks] = useState(false);
  const [dropTask, setDropTask] = useState(false);
  const [editProject, setEditProject] = useState(false);

  const openTasks = id => {
    const Task = listTasks.filter(item => item.id === id);
    setVisibleTasks(Task[0].id);
  };
  const dragStartHandler = (e, task) => {
    setDropTask(task.id);
  };
  const dragEndHandler = e => {};
  const dragOverHandler = e => {
    e.preventDefault();
  };
  const dragDropHandler = (e, list) => {
    e.preventDefault();
    props.updateStatusTask(dropTask, list.id);
    setDropTask(false);
  };
  const deleteProj = () => {
    props.deleteProject(project[0].id);
    return <Redirect to={"/"} />;
  };
  if (!project[0]) return <Redirect to={"/"} />;
  if (!props.user) return <Redirect to={"/login"} />;
  return (
    <div className="main-page">
      <div>
        <Header />
        <Menu />
      </div>
      <div className="main-page__content">
        <div className="main-page__content-title project__title">
          <div className="project__title-txt">
            ????????????: {project[0].name}
            <div onClick={() => setEditProject(true)}>
              <Edit />
            </div>
            <div onClick={() => deleteProj()}>
              <Closed />
            </div>
          </div>

          <div onClick={() => setVisibleAddTask(true)}>
            <Button text="???????????????? ????????????" type="add-task" color="blue" />
          </div>
        </div>
        <div className="project__users">
          <div className="project__users-txt">??????????????????:</div>
          {project[0].users &&
            project[0].users.map(usersId => (
              <div key={`${Math.random()}${usersId}`}>
                {props.users.map(
                  user =>
                    user.id === usersId && (
                      <div
                        key={user.id}
                        className="main-page__content__project-item-user"
                      >
                        <Users userIdArray={user.name.substring(0, 1)} />
                      </div>
                    )
                )}
              </div>
            ))}
        </div>
        <div className="lists">
          {props.state.status.map(statusArr => (
            <div
              onDrop={e => dragDropHandler(e, statusArr)}
              onDragEnd={e => dragEndHandler(e)}
              onDragLeave={e => dragEndHandler(e)}
              onDragOver={e => dragOverHandler(e)}
              className="lists__list"
              key={statusArr.id}
            >
              <div className="lists__list__header">
                <div className="lists__list-title">{statusArr.name}</div>
              </div>

              <div className="lists__list-tasks">
                {listTasks
                  .filter(item => item.statusId === statusArr.id)
                  .map(taskOnList => (
                    <div
                      draggable={true}
                      onDragStart={e => dragStartHandler(e, taskOnList)}
                      className="lists__list-tasks__task"
                      onClick={() => openTasks(taskOnList.id)}
                      key={taskOnList.id}
                    >
                      <div className="lists__list-tasks__task__title">
                        {taskOnList.name}
                      </div>
                      <div className="lists__list-tasks__task__bottom">
                        {props.users.map(
                          user =>
                            user.id === taskOnList.users && (
                              <div key={user.id}>
                                <Users
                                  userIdArray={user.name.substring(0, 1)}
                                />
                              </div>
                            )
                        )}
                        {taskOnList.tags === 1 && (
                          <div className="task-esy">????????????</div>
                        )}
                        {taskOnList.tags === 2 && (
                          <div className="task-medium">??????????????</div>
                        )}
                        {taskOnList.tags === 3 && (
                          <div className="task-complicated">??????????????</div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          <div className="lists__description">
            <div className="lists__description-status lists__description-title">
              <div className="lists__description-title-status">????????????:</div>
              {project[0].status === 1 && (
                <div className="main-page__content__project__status-active">
                  ????????????????
                </div>
              )}
              {project[0].status === 2 && (
                <div className="main-page__content__project__status-stop">
                  ??????????????????????????
                </div>
              )}
              {project[0].status === 3 && (
                <div className="main-page__content__project__status-complete">
                  ????????????????
                </div>
              )}
            </div>

            <div className="lists__description-description">
              <div className="lists__description-title">????????????????:</div>
              <div>{project[0].description}</div>
            </div>
            <div>
              <div className="lists__description-title"> ??????????????????:</div>

              {props.users.map(
                user =>
                  user.id === project[0].author && (
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
              <div className="lists__description-title"> ??????????????:</div>

              <div className="main-page__content__project-item">
                {project[0].users.map(userId =>
                  props.users.map(
                    user =>
                      user.id === userId && (
                        <div
                          key={user.id}
                          className="main-page__content__project-item-user"
                        >
                          <Users userIdArray={user.name.substring(0, 1)} />
                        </div>
                      )
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          {visibleTasks && (
            <div>
              <ModalAddTask
                active={listTasks.filter(item => item.id === visibleTasks)[0]}
                setActive={setVisibleTasks}
                projectId={project[0].id}
                task={listTasks.filter(item => item.id === visibleTasks)[0]}
                usersInProject={project[0].users}
              />
            </div>
          )}
        </div>
      </div>
      {visibleAddTask && (
        <ModalAddTask
          active={visibleAddTask}
          setActive={setVisibleAddTask}
          projectId={project[0].id}
          usersInProject={project[0].users}
          task
        />
      )}
      {editProject && (
        <ModalAddProject
          active={editProject}
          setActive={setEditProject}
          project={project[0]}
        />
      )}
    </div>
  );
}

export default connect(mapStateToProps, {
  addList,
  copyList,
  isFavourite,
  sendTask,
  updateDescriptionTitle,
  updateList,
  updateStatusTask,
  deleteTask,
  deleteProject
})(TasksInProjectPage);
