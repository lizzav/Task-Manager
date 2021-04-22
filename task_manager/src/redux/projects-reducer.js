const UPDATE_TASKS_TITLE = "UPDATE_TASKS_TITLE";
const UPDATE_TASKS_DESCRIPTION = "UPDATE_TASKS_DESCRIPTION";
const SEND_PROJECT = "SEND_PROJECT";
const SEND_TASK = "SEND_TASK";
const UPDATE_FAVOURITE = "UPDATE_FAVOURITE";
const COPY_LIST="COPY_LIST";
const DELETE_LIST="DELETE_LIST";
const UPDATE_LIST="UPDATE_LIST";
const ADD_LIST="ADD_LIST";

const initialState = {
  projects: [
    {
      id: 1,
      name: "project1",
      description: "descriptiondelke dnejkndend bwndknw",
      author: [{ id: 1, name: "d898" }],
      users: [
        { id: 1, name: "d898" },
        { id: 2, name: "e" },
        { id: 5, name: "d" },
        { id: 4, name: "e" },

        { id: 9, name: "d" },
        { id: 49, name: "e" }
      ],
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
      author: [{ id: 1, name: "7" }],
      users: [
        { id: 1, name: "d" },
        { id: 2, name: "e" }
      ],
      status: [
        { id: 1, name: 1 },
        { id: 2, name: 2 },
        { id: 3, name: 3 }
      ],
      isFavorite: true
    },

    {
      id: 3,
      name: "project3",
      description: "description",
      author: [{ id: 1, name: "9" }],
      users: [
        { id: 1, name: "d" },
        { id: 2, name: "e" }
      ],
      status: [
        { id: 1, name: 1 },
        { id: 2, name: 2 },
        { id: 3, name: 3 }
      ],
      isFavorite: false
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
      users: [1, 2, 3, 4, 5],
      tags: [1, 4, 4],
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
    { id: 1, name: "tag1" },
    { id: 2, name: "tag2" },
    { id: 4, name: "tag3" }
  ]
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          {
            id: Math.floor(Math.random()*100000),
            name: action.name,
            description: action.description,
            author: [],
            users: [],
            status: [1, 2, 3],
            isFavorite: false
          }
        ]
      };
    case UPDATE_FAVOURITE: {
      const idx = state.projects.findIndex(el => el.id === parseInt(action.id));
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
      const idxp = state.projects.findIndex(el => el.id === parseInt(action.projectId));
      const oldProject = state.projects[idxp];
      const idxs=state.projects[idxp].status.findIndex(el => el.id === parseInt(action.statusId));

      const oldStatus= oldProject.status[idxs];
      console.log(oldStatus);
      return {
        ...state,
        projects: [
          ...state.projects.slice(0,idxp),
          {...state.projects[idxp],status: [
              ...state.projects[idxp].status.slice(0, idxs),

              oldStatus,
              {...oldStatus,id:Math.floor(Math.random()*100000)},
              ...state.projects[idxp].status.slice(idxs+1)
            ]},
          ...state.projects.slice(idxp+1)
        ]
      };
    }case DELETE_LIST: {
      const idxp = state.projects.findIndex(el => el.id === parseInt(action.projectId));
      const oldProject = state.projects[idxp];
      const idxs=oldProject.status.findIndex(el => el.id === parseInt(action.statusId));
      return {
        ...state,
        projects: [
          ...state.projects.slice(0,idxp),
          {...state.projects[idxp],status: [
              ...state.projects[idxp].status.slice(0, idxs),
              ...state.projects[idxp].status.slice(idxs+1)
            ]},
          ...state.projects.slice(idxp+1)
        ],
      };
    }
    case UPDATE_LIST: {
      const idxp = state.projects.findIndex(el => el.id === parseInt(action.projectId));
      const oldProject = state.projects[idxp];
      const idxs=oldProject.status.findIndex(el => el.id === parseInt(action.statusId));
      const oldItem = oldProject.status[idxs];
      const newItem = { ...oldItem, name: action.name };
      return {
        ...state,
        projects: [
          ...state.projects.slice(0,idxp),
          {...state.projects[idxp],status: [
              ...state.projects[idxp].status.slice(0, idxs),
              newItem,
              ...state.projects[idxp].status.slice(idxs+1)
            ]},
          ...state.projects.slice(idxp+1)
        ],
      };
    }case ADD_LIST: {
      const idxp = state.projects.findIndex(el => el.id === parseInt(action.projectId));
      return {
        ...state,
        projects: [
          ...state.projects.slice(0,idxp),
          {...state.projects[idxp],status: [
              ...state.projects[idxp].status,
              {id:Math.floor(Math.random()*100000),name:action.name}
            ]},
          ...state.projects.slice(idxp+1)
        ],
      };
    }

    case SEND_TASK: {
      return {
        ...state,
        tasks: [
          ...state.tasks,{id:Math.floor(Math.random()*100000),name:action.name,projectId: parseInt(action.projectId),statusId: action.statusId}

          ]
      };
    }
    case UPDATE_TASKS_TITLE: {
      const idx = state.tasks.findIndex(el => el.id === parseInt(action.id));
      const oldItem = state.tasks[idx];
      const newItem = { ...oldItem, name: action.name };
      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, idx),
          newItem,
          ...state.tasks.slice(idx + 1)
        ]
      };
    }
    case UPDATE_TASKS_DESCRIPTION: {
      const idx = state.tasks.findIndex(el => el.id === parseInt(action.id));
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

    default:
      return state;
  }
};

export const sendProjectCreator = (name, description) => ({
  type: SEND_PROJECT,
  name: name,
  description: description
});

export const isFavouriteCreator = id => ({
  type: UPDATE_FAVOURITE,
  id: id
});
export const copyListCreator = (projectId, statusId) => ({
  type: COPY_LIST,
  projectId: projectId,
  statusId: statusId
});export const deleteListCreator = (projectId, statusId) => ({
  type: DELETE_LIST,
  projectId: projectId,
  statusId: statusId
});export const updateListCreator = (projectId, statusId,name) => ({
  type: UPDATE_LIST,
  projectId: projectId,
  statusId: statusId,
  name:name
});export const addListCreator = (projectId,name) => ({
  type: ADD_LIST,
  projectId: projectId,
  name:name
});

export const sendTaskCreator = (projectId, statusId, name) => ({
  type: SEND_TASK,
  name: name,
  projectId: projectId,
  statusId:statusId
});
export const updateTasksTitleCreator = (id, name) => ({
  type: UPDATE_TASKS_TITLE,
  name: name,
  id: id
});
export const updateDescriptionTitleCreator = (id, description) => ({
  type: UPDATE_TASKS_DESCRIPTION,
  description: description,
  id: id
});

export default projectReducer;
