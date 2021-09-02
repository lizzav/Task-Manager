const UPDATE_USER = "UPDATE_USER";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const LOGIN = "LOGIN";
const REGISTRATION = "REGISTRATION";
const LOGOUT = "LOGOUT";
const DELETE_MASSAGE_PASSWORD = "DELETE_MASSAGE_PASSWORD";
const DELETE_MASSAGE_USERS = "DELETE_MASSAGE_USERS";

const initialState = {
  profile: {
    id: null
  },
  updatePassword: "",
  updateUsers: "",
  login: "",
  registrationMs: "",
  users: [
    {
      id: 1,
      name: "Liza",
      email: "pochta@mail.ru",
      about: "i`m working",
      password: "12345",
      age: "21",
      company: "none",
      speciality: "developer",
      location: "Tomsk"
    },
    {
      id: 2,
      name: "a",
      email: "pochta2@mail.ru",
      about: "",
      password: "12345",
      age: "",
      company: "",
      speciality: "",
      location: ""
    },
    {
      id: 5,
      name: "b",
      email: "pochta5@mail.ru",
      about: "",
      password: "12345",
      age: "",
      company: "",
      speciality: "",
      location: ""
    },
    {
      id: 4,
      name: "c",
      email: "pochta4@mail.ru",
      about: "",
      password: "12345",
      age: "",
      company: "",
      speciality: "",
      location: ""
    },

    {
      id: 3,
      name: "d",
      email: "pochta3@mail.ru",
      about: "",
      password: "12345",
      age: "",
      company: "",
      speciality: "",
      location: ""
    },
    {
      id: 49,
      name: "e",
      email: "pochta49@mail.ru",
      about: "",
      password: "12345",
      age: "",
      company: "",
      speciality: "",
      location: ""
    },
    {
      id: 56,
      name: "f",
      email: "pochta56@mail.ru",
      about: "",
      password: "12345",
      age: "",
      company: "",
      speciality: "",
      location: ""
    }
  ]
};

const indx = (state, id) => {
  return state.findIndex(el => el.id === parseInt(id));
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER: {
      const idx = indx(state.users, action.id);

      const oldItem = state.users[idx];
      const newItem = {
        ...oldItem,
        name: action.name,
        email: action.email,
        about: action.about
      };
      return {
        ...state,
        users: [
          ...state.users.slice(0, idx),
          newItem,
          ...state.users.slice(idx + 1)
        ],
        updateUsers: "Изменения успещно сохранены"
      };
    }

    case DELETE_MASSAGE_PASSWORD: {
      return {
        ...state,
        updatePassword: ""
      };
    }
    case DELETE_MASSAGE_USERS: {
      return {
        ...state,
        updateUsers: ""
      };
    }

    case UPDATE_PASSWORD: {
      const idx = indx(state.users, action.id);
      const oldItem = state.users[idx];
      switch (oldItem.password === action.oldPassword) {
        case true: {
          const newItem = { ...oldItem, password: action.newPassword };
          return {
            ...state,
            users: [
              ...state.users.slice(0, idx),
              newItem,
              ...state.users.slice(idx + 1)
            ],
            updatePassword: "Пароль успешно изменен"
          };
        }

        default:
          return { ...state, updatePassword: "Пароли не совпадают" };
      }
    }
    case LOGIN: {
      const user = state.users.filter(
        user => user.email === action.login && user.password === action.password
      )[0];
      switch (user !== undefined) {
        case true: {
          return {
            ...state,
            profile: { ...state.profile, id: user.id },
            login: ""
          };
        }
        case false: {
          return {
            ...state,
            login: "Неправильное имя пользователя или пароль"
          };
        }
      }
    }
    case REGISTRATION: {
      const user = state.users.filter(user => user.email === action.login)[0];
      const id = Math.floor(Math.random() * 100000);
      switch (user === undefined) {
        case true: {
          return {
            ...state,
            users: [
              ...state.users,
              {
                id: id,
                name: action.name,
                email: action.login,
                password: action.password
              }
            ],
            profile: { ...state.profile, id: id },
            registrationMs: ""
          };
        }
        case false: {
          return {
            ...state,
            registrationMs: "Данный email уже используется"
          };
        }
      }
      return {
        ...state
      };
    }
    case LOGOUT: {
      return {
        ...state,
        profile: { ...state.profile, id: null }
      };
    }

    default:
      return state;
  }
};

export const updateUser = (id, name, email, about) => ({
  type: UPDATE_USER,
  id,
  name: name,
  email: email,
  about: about
});
export const updatePassword = (id, oldPassword, newPassword) => ({
  type: UPDATE_PASSWORD,
  id,
  oldPassword,
  newPassword
});
export const login = (login, password) => ({
  type: LOGIN,
  login,
  password
});
export const registration = (login, password, name) => ({
  type: REGISTRATION,
  login,
  password,
  name
});
export const deleteMessagePassword = () => ({
  type: DELETE_MASSAGE_PASSWORD
});
export const deleteMessageUsers = () => ({
  type: DELETE_MASSAGE_USERS
});
export const logout = () => ({
  type: LOGOUT
});

export default profileReducer;
