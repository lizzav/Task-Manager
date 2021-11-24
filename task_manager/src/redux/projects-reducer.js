const UPDATE_TASKS = "UPDATE_TASKS";
const SEND_PROJECT = "SEND_PROJECT";
const SEND_TASK = "SEND_TASK";
const DELETE_PROJECT = "DELETE_PROJECT";
const UPDATE_STATUS_TASK = "UPDATE_STATUS_TASK";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_PROJECT = "UPDATE_PROJECT";

const initialState = {
  projects: [
    {
      id: 1,
      name: "project1",
      description:
        "descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh br kdjbv skjhv ",
      author: 1,
      users: [1, 2, 3, 4, 5, 49, 56],
      status: 1,
      isFavorite: false
    },

    {
      id: 2,
      name: "project2",
      description: "description",
      author: 1,
      users: [1, 2, 3, 4, 5],
      status: 2,
      isFavorite: true
    },
    {
      id: 3,
      name: "project1",
      description:
        "descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh br kdjbv skjhv ",
      author: 1,
      users: [1, 2, 3, 4, 5, 49, 56],
      status: 1,
      isFavorite: false
    },
    {
      id: 4,
      name: "project1",
      description:
        "descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh br kdjbv skjhv ",
      author: 1,
      users: [1, 2, 3, 4, 5, 49, 56],
      status: 1,
      isFavorite: false
    },

    {
      id: 5,
      name: "project2",
      description: "description",
      author: 1,
      users: [1, 2, 3, 4, 5],
      status: 2,
      isFavorite: true
    },
    {
      id: 6,
      name: "project1",
      description:
        "descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh br kdjbv skjhv ",
      author: 1,
      users: [1, 2, 3, 4, 5, 49, 56],
      status: 1,
      isFavorite: false
    },
    {
      id: 7,
      name: "project1",
      description:
        "descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh br kdjbv skjhv ",
      author: 1,
      users: [1, 2, 3, 4, 5, 49, 56],
      status: 1,
      isFavorite: false
    },

    {
      id: 8,
      name: "project2",
      description: "description",
      author: 1,
      users: [1, 2, 3, 4, 5],
      status: 2,
      isFavorite: true
    },
    {
      id: 9,
      name: "project1",
      description:
        "descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh br kdjbv skjhv ",
      author: 1,
      users: [1, 2, 3, 4, 5, 49, 56],
      status: 1,
      isFavorite: false
    },

    {
      id: 10,
      name: "project2",
      description: "description",
      author: 1,
      users: [1, 2, 3, 4, 5],
      status: 2,
      isFavorite: true
    }
  ],
  tasks: [
    {
      id: 1,
      name: "project",
      projectId: 1,
      statusId: 1,
      description: "description",
      author: 1,
      users: 1,
      tags: 3,
      file: [1, 23]
    },

    {
      id: 2,
      name: "project",
      projectId: 2,
      statusId: 2,
      description: "description",
      author: 1,
      users: 2,
      tags: 2,
      file: [1]
    },

    {
      id: 3,
      name: "project",
      projectId: 1,
      statusId: 1,
      description: "description",
      author: 1,
      users: 3,
      tags: 1,
      file: [1, 23, 89]
    }
  ],
  status: [
    { id: 1, name: "Нужно сделать" },
    { id: 2, name: "В работе" },
    { id: 3, name: "Готово" }
  ]
};
const indx = (state, id) => {
  return state.findIndex(el => el.id === parseInt(id));
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          {
            id: Math.floor(Math.random() * 100000),
            name: action.name,
            description: action.description,
            author: action.userId,
            users: action.users,
            status: action.activeStatus,
            isFavorite: false
          }
        ]
      };

    case UPDATE_PROJECT: {
      const idx = indx(state.projects, action.id);
      const oldItem = state.projects[idx];
      const newItem = {
        ...oldItem,
        name: action.name,
        description: action.description,
        author: action.userId,
        users: action.users,
        status: action.activeStatus
      };
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, idx),
          newItem,
          ...state.projects.slice(idx + 1)
        ]
      };
    }

    case DELETE_PROJECT: {
      const idxp = indx(state.projects, action.projectId);

      const newTask = state.tasks.filter(
        el => el.projectId !== parseInt(action.projectId)
      );

      return {
        ...state,
        projects: [
          ...state.projects.slice(0, idxp),
          ...state.projects.slice(idxp + 1)
        ],
        tasks: newTask
      };
    }

    case SEND_TASK: {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Math.floor(Math.random() * 100000),
            name: action.name,
            projectId: parseInt(action.projectId),
            statusId: 1,
            description: action.description,
            author: action.author,
            users: action.users,
            tags: action.activeStatus
          }
        ]
      };
    }

    case UPDATE_TASKS: {
      const idx = indx(state.tasks, action.id);
      const oldItem = state.tasks[idx];
      const newItem = {
        ...oldItem,
        name: action.name,
        description: action.description,
        author: action.author,
        users: action.users,
        tags: action.status
      };
      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, idx),
          newItem,
          ...state.tasks.slice(idx + 1)
        ]
      };
    }

    case UPDATE_STATUS_TASK: {
      const idx = indx(state.tasks, action.taskId);
      const oldItem = state.tasks[idx];
      const newItem = { ...oldItem, statusId: action.listId };
      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, idx),
          newItem,
          ...state.tasks.slice(idx + 1)
        ]
      };
    }

    case DELETE_TASK: {
      const idx = indx(state.tasks, action.taskId);
      return {
        ...state,
        tasks: [...state.tasks.slice(0, idx), ...state.tasks.slice(idx + 1)]
      };
    }

    default:
      return state;
  }
};

export const sendProject = (
  name,
  description,
  userId,
  users,
  activeStatus
) => ({
  type: SEND_PROJECT,
  name,
  description,
  userId,
  users,
  activeStatus
});
export const updateProject = (
  id,
  name,
  description,
  userId,
  users,
  activeStatus
) => ({
  type: UPDATE_PROJECT,
  id,
  name,
  description,
  userId,
  users,
  activeStatus
});

export const deleteProject = projectId => ({
  type: DELETE_PROJECT,
  projectId: projectId
});

export const sendTask = (
  projectId,
  name,
  description,
  userId,
  users,
  activeStatus
) => ({
  type: SEND_TASK,
  name,
  projectId,
  description,
  userId,
  users,
  activeStatus
});
export const updateTasks = (id, name, description, author, users, status) => ({
  type: UPDATE_TASKS,
  name,
  id,
  description,
  author,
  users,
  status
});
export const updateStatusTask = (taskId, listId) => ({
  type: UPDATE_STATUS_TASK,
  taskId: taskId,
  listId: listId
});
export const deleteTask = taskId => ({
  type: DELETE_TASK,
  taskId: taskId
});
export default projectReducer;
