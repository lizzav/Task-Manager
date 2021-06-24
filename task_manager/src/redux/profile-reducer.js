const UPDATE_USER = "UPDATE_USER";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const SEND_CHANGE_USER = "SEND_CHANGE_USER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialState = {
  profile: {
    id: null
  },

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
      email: "",
      about: "",
      password: "",
      age: "",
      company: "",
      speciality: "",
      location: ""
    },
    {
      id: 5,
      name: "b",
      email: "",
      about: "",
      password: "",
      age: "",
      company: "",
      speciality: "",
      location: ""
    },
    {
      id: 4,
      name: "c",
      email: "",
      about: "",
      password: "",
      age: "",
      company: "",
      speciality: "",
      location: ""
    },

    {
      id: 3,
      name: "d",
      email: "",
      about: "",
      password: "",
      age: "",
      company: "",
      speciality: "",
      location: ""
    },
    {
      id: 49,
      name: "e",
      email: "",
      about: "",
      password: "",
      age: "",
      company: "",
      speciality: "",
      location: ""
    },
    {
      id: 56,
      name: "f",
      email: "",
      about: "",
      password: "",
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
        ]
      };
    }
    case UPDATE_PASSWORD: {
      const idx = indx(state.users, action.id);
      const oldItem = state.users[idx];
      console.log(oldItem, "old", idx, state.users, action.id);
      switch (oldItem.password === action.oldPassword) {
        case true: {
          const newItem = { ...oldItem, password: action.newPassword };
          console.log(newItem, "new");
          return {
            ...state,
            users: [
              ...state.users.slice(0, idx),
              newItem,
              ...state.users.slice(idx + 1)
            ]
          };
        }
        default:
          return state;
      }
    }
    case SEND_CHANGE_USER: {
      return {
        ...state,
        profile: {
          ...state.profile,
          about: action.about,
          age: action.age,
          company: action.company,
          speciality: action.speciality,
          location: action.location
        }
      };
    }
    case LOGIN: {
      const user = state.users.filter(
        user => user.email === action.login && user.password === action.password
      )[0];
      if (user && user.id)
        return {
          ...state,
          profile: { ...state.profile, id: user.id }
        };
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
export const sendChangeUser = (about, age, speciality, company, location) => ({
  type: SEND_CHANGE_USER,
  about,
  age,
  speciality,
  company,
  location
});
export const login = (login, password) => ({
  type: LOGIN,
  login,
  password
});
export const logout = () => ({
  type: LOGOUT
});

export default profileReducer;
