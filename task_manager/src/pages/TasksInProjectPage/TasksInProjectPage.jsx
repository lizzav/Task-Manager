import React, { useState } from "react";
import "./TasksInProjectPage.scss";
import { ReactComponent as Edit } from "../../svg/edit.svg";
import { ReactComponent as Closed } from "../../svg/closed.svg";
import { useRouteMatch } from "react-router";
import Button from "../../component/Button";
import { connect } from "react-redux";
import { updateStatusTask, deleteProject } from "../../redux/projects-reducer";
import { Redirect } from "react-router-dom";
import ModalAddTask from "../../component/ModalAddTask";
import ModalAddProject from "../../component/ModalAddProject";
import GetUsers from "../../component/GetUsers";
import MenuAndHeader from "../../component/MenuAndHeader";
import Task from "../../component/Task";
import ProjectInfo from "../../component/ProjectInfo";

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
  const dragEndHandler = () => {};
  const dragOverHandler = e => {
    e.preventDefault();
  };
  const dragDropHandler = (e, list) => {
    e.preventDefault();
    props.updateStatusTask(dropTask, list.id);
    setDropTask(false);
  };
  const deleteProject = () => {
    props.deleteProject(project[0].id);
    return <Redirect to={"/"} />;
  };
  if (!project[0]) return <Redirect to={"/error"} />;
  if (!props.user) return <Redirect to={"/login"} />;
  return (
    <div className="main-page">
      <MenuAndHeader />

      <div className="main-page__content">
        <div className="main-page__content-title project__title">
          <div className="project__title-txt">
            Проект: {project[0].name}
            <div onClick={() => setEditProject(true)}>
              <Edit />
            </div>
            <div onClick={() => deleteProject()}>
              <Closed />
            </div>
          </div>

          <div onClick={() => setVisibleAddTask(true)}>
            <Button text="Добавить задачу" type="add-task" color="blue" />
          </div>
        </div>

        <div className="project__users">
          <div className="project__users-txt">Участники:</div>
          <GetUsers projectUsers={project[0].users} />
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
                    <Task
                      users={props.users}
                      dragStartHandler={dragStartHandler}
                      openTasks={openTasks}
                      taskOnList={taskOnList}
                    />
                  ))}
              </div>
            </div>
          ))}

          <ProjectInfo users={props.users} project={project[0]} />
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
  updateStatusTask,
  deleteProject
})(TasksInProjectPage);
