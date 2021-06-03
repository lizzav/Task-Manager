const UPDATE_TASKS_TITLE = "UPDATE_TASKS_TITLE";
const UPDATE_TASKS_DESCRIPTION = "UPDATE_TASKS_DESCRIPTION";
const SEND_PROJECT = "SEND_PROJECT";
const SEND_TASK = "SEND_TASK";
const UPDATE_FAVOURITE = "UPDATE_FAVOURITE";
const COPY_LIST = "COPY_LIST";
const DELETE_LIST = "DELETE_LIST";
const UPDATE_LIST = "UPDATE_LIST";
const ADD_LIST = "ADD_LIST";
const UPDATE_STATUS_TASK = "UPDATE_STATUS_TASK";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_NAME_TAG = "UPDATE_NAME_TAG";

const initialState = {
  projects: [
    {
      id: 1,
      name: "project1",
      description:
        "descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh descriptiondelke dnejkndend bwndknw kfnfn fjdfkds djdkjfbnmf djdbdm  dndnmdnbf dejh br kdjbv skjhv ",
      author: [1],
      users: [1, 2, 3, 4, 5, 49, 56],
      status: [
        { id: 1, name: 1 },
        { id: 2, name: 2456 },
        { id: 3, name: 3 }
      ],
      isFavorite: false
    },

    {
      id: 2,
      name: "project2",
      description: "description",
      author: [1],
      users: [1, 2, 3, 4, 5],
      status: [
        { id: 1, name: 1 },
        { id: 2, name: 2 },
        { id: 3, name: 3 }
      ],
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
      author: [1],
      users: [1, 2, 3, 4, 5, 49, 56],
      tags: [1, 2, 3, 4, 5, 6, 7, 8],
      file: [1, 23]
    },

    {
      id: 2,
      name: "project",
      projectId: 2,
      statusId: 2,
      description: "description",
      author: [1],
      users: [1, 2, 3, 4, 5],
      tags: [1, 2, 4],
      file: [1]
    },

    {
      id: 3,
      name: "project",
      projectId: 1,
      statusId: 1,
      description: "description",
      author: [1],
      users: [1, 2, 3, 4, 5],
      tags: [1, 2, 4],
      file: [1, 23, 89]
    }
  ],
  // status:[
  //   {id:1,name:"name"},
  //   {id:2,name:"name1"},
  //   {id:4,name:"name2"},
  //
  // ],
  tags: [
    { id: 1, name: "tag1", color: 1 },
    { id: 2, name: "tag2", color: 3 },
    { id: 3, name: "tag3", color: 4 },
    { id: 4, name: "tag4", color: 4 },
    { id: 5, name: "tag5", color: 4 },
    { id: 6, name: "tag6", color: 4 },
    { id: 7, name: "tag7", color: 4 },
    { id: 8, name: "tag8fjkejdkedjkejdekldkle denekndkm d", color: 4 }
  ],
  color: [
    { id: 1, name: "green" },
    { id: 2, name: "orange" },
    { id: 2, name: "pink" },
    { id: 2, name: "purple" },
    { id: 2, name: "rad" },
    { id: 2, name: "light_blue" }
  ],
  actions: [
    { id: 1, name: "добавил(а) новую задачу на доску" },
    { id: 2, name: "удалил(а) задачу с доски" },
    { id: 3, name: "добавил(а) новый список на доску" },
    { id: 4, name: "удалил(а) список с доски" },
    { id: 5, name: "удалил(а) проект" },
    { id: 6, name: "переместил(а) задачу на доске" },
    { id: 7, name: "обновил(а) название задачи на доске" },
    { id: 8, name: "обновил(а) название списка на доске" },
    { id: 9, name: "копировал(а) список на доске" }
  ],
  newAction: []
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
            author: [],
            users: [],
            status: [
              { id: 1, name: "В работе" },
              { id: 2, name: "new" },
              { id: 1, name: "complete" }
            ],
            isFavorite: false
          }
        ]
      };
    case UPDATE_FAVOURITE: {
      const idx = indx(state.projects, action.id);
      const oldItem = state.projects[idx];
      const newItem = { ...oldItem, isFavorite: !oldItem.isFavorite };
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, idx),
          newItem,
          ...state.projects.slice(idx + 1)
        ]
      };
    }
    case COPY_LIST: {
      const idxp = indx(state.projects, action.projectId);
      const oldProject = state.projects[idxp];
      const idxs = indx(state.projects[idxp].status, action.statusId);
      const oldStatus = oldProject.status[idxs];
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, idxp),
          {
            ...state.projects[idxp],
            status: [
              ...state.projects[idxp].status.slice(0, idxs),

              oldStatus,
              { ...oldStatus, id: Math.floor(Math.random() * 100000) },
              ...state.projects[idxp].status.slice(idxs + 1)
            ]
          },
          ...state.projects.slice(idxp + 1)
        ],
        newAction: [
          {
            id: Math.floor(Math.random() * 100000),
            type: 9,
            users: 1,
            project: parseInt(action.projectId)
          },
          ...state.newAction.slice(0, 3)
        ]
      };
    }
    case DELETE_LIST: {
      const idxp = indx(state.projects, action.projectId);
      const oldProject = state.projects[idxp];
      const idxs = indx(oldProject.status, action.statusId);
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, idxp),
          ...state.projects.slice(0, idxp),
          {
            ...state.projects[idxp],
            status: [
              ...state.projects[idxp].status.slice(0, idxs),
              ...state.projects[idxp].status.slice(idxs + 1)
            ]
          },
          ...state.projects.slice(idxp + 1)
        ],
        newAction: [
          {
            id: Math.floor(Math.random() * 100000),
            type: 4,
            users: 1,
            project: parseInt(action.projectId)
          },
          ...state.newAction.slice(0, 3)
        ],
        tasks: state.tasks.filter(
          el =>
            el.statusId !== parseInt(action.statusId) ||
            el.projectId !== parseInt(action.projectId)
        )
      };
    }
    case UPDATE_LIST: {
      const idxp = indx(state.projects, action.projectId);
      const oldProject = state.projects[idxp];
      const idxs = indx(oldProject.status, action.statusId);
      const oldItem = oldProject.status[idxs];
      const newItem = { ...oldItem, name: action.name };
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, idxp),
          {
            ...state.projects[idxp],
            status: [
              ...state.projects[idxp].status.slice(0, idxs),
              newItem,
              ...state.projects[idxp].status.slice(idxs + 1)
            ]
          },
          ...state.projects.slice(idxp + 1)
        ],
        newAction: [
          {
            id: Math.floor(Math.random() * 100000),
            type: 8,
            users: 1,
            project: parseInt(action.projectId)
          },
          ...state.newAction.slice(0, 3)
        ]
      };
    }
    case ADD_LIST: {
      const idxp = indx(state.projects, action.projectId);
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, idxp),
          {
            ...state.projects[idxp],
            status: [
              ...state.projects[idxp].status,
              { id: Math.floor(Math.random() * 100000), name: action.name }
            ]
          },
          ...state.projects.slice(idxp + 1)
        ],
        newAction: [
          {
            id: Math.floor(Math.random() * 100000),
            type: 3,
            users: 1,
            project: parseInt(action.projectId)
          },
          ...state.newAction.slice(0, 3)
        ]
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
            statusId: action.statusId
          }
        ],
        newAction: [
          {
            id: Math.floor(Math.random() * 100000),
            type: 1,
            users: 1,
            project: parseInt(action.projectId)
          },
          ...state.newAction.slice(0, 3)
        ]
      };
    }
    case UPDATE_TASKS_TITLE: {
      const idx = indx(state.tasks, action.id);
      const oldItem = state.tasks[idx];
      const newItem = { ...oldItem, name: action.name };
      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, idx),
          newItem,
          ...state.tasks.slice(idx + 1)
        ],
        newAction: [
          {
            id: Math.floor(Math.random() * 100000),
            type: 7,
            users: 1,
            project: newItem.projectId
          },
          ...state.newAction.slice(0, 3)
        ]
      };
    }
    case UPDATE_TASKS_DESCRIPTION: {
      const idx = indx(state.tasks, action.id);
      const oldItem = state.tasks[idx];
      const newItem = { ...oldItem, description: action.description };
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
        ],
        newAction: [
          {
            id: Math.floor(Math.random() * 100000),
            type: 6,
            users: 1,
            project: newItem.projectId
          },
          ...state.newAction.slice(0, 3)
        ]
      };
    }
    case DELETE_TASK: {
      const idx = indx(state.tasks, action.taskId);
      return {
        ...state,
        tasks: [...state.tasks.slice(0, idx), ...state.tasks.slice(idx + 1)],
        newAction: [
          {
            id: Math.floor(Math.random() * 100000),
            type: 2,
            users: 1,
            project: state.tasks[idx].projectId
          },
          ...state.newAction.slice(0, 3)
        ]
      };
    }

    case UPDATE_NAME_TAG: {
      const idx = indx(state.tags, action.tagId);
      const oldItem = state.tags[idx];
      const newItem = { ...oldItem, name: action.name };
      return {
        ...state,
        tags: [
          ...state.tasks.slice(0, idx),
          newItem,
          ...state.tasks.slice(idx + 1)
        ]
      };
    }

    default:
      return state;
  }
};

export const sendProject = (name, description) => ({
  type: SEND_PROJECT,
  name: name,
  description: description
});

export const isFavourite = id => ({
  type: UPDATE_FAVOURITE,
  id: id
});
export const copyList = (projectId, statusId) => ({
  type: COPY_LIST,
  projectId: projectId,
  statusId: statusId
});
export const deleteList = (projectId, statusId) => ({
  type: DELETE_LIST,
  projectId: projectId,
  statusId: statusId
});
export const updateList = (projectId, statusId, name) => ({
  type: UPDATE_LIST,
  projectId: projectId,
  statusId: statusId,
  name: name
});
export const addList = (projectId, name) => ({
  type: ADD_LIST,
  projectId: projectId,
  name: name
});

export const sendTask = (projectId, statusId, name) => ({
  type: SEND_TASK,
  name: name,
  projectId: projectId,
  statusId: statusId
});
export const updateTasksTitle = (id, name) => ({
  type: UPDATE_TASKS_TITLE,
  name: name,
  id: id
});
export const updateDescriptionTitle = (id, description) => ({
  type: UPDATE_TASKS_DESCRIPTION,
  description: description,
  id: id
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
export const updateNameTag = (tagId, name) => ({
  type: UPDATE_NAME_TAG,
  tagId,
  name
});
export default projectReducer;
