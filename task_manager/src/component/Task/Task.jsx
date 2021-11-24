import React from "react";
import "./Task.scss";
import Users from "../Users/Users";

function Task({ taskOnList, dragStartHandler, openTasks, users }) {
  return (
    <div
      draggable={true}
      onDragStart={e => dragStartHandler(e, taskOnList)}
      className="tasks__task"
      onClick={() => openTasks(taskOnList.id)}
      key={taskOnList.id}
    >
      <div className="tasks__task__title">{taskOnList.name}</div>
      <div className="tasks__task__bottom">
        {users.map(
          user =>
            user.id === taskOnList.users && (
              <div key={user.id}>
                <Users userIdArray={user.name.substring(0, 1)} />
              </div>
            )
        )}

        {taskOnList.tags === 1 && <div className="task-esy">Легкая</div>}
        {taskOnList.tags === 2 && <div className="task-medium">Средняя</div>}
        {taskOnList.tags === 3 && (
          <div className="task-complicated">Сложная</div>
        )}
      </div>
    </div>
  );
}

export default Task;
