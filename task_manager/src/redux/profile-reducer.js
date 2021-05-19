const UPDATE_USER = "UPDATE_USER";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const SEND_CHANGE_USER = "SEND_CHANGE_USER";

const initialState = {
  profile: {
    id: 1,
    name: "Liza",
    email: "pochta@mail.ru",
    about: "i`m working",
    password: "12345",
    age: "",
    company: "none",
    speciality: "developer",
    location: "Tomsk"
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

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER: {
      console.log(action.name, action.email, action.about);
      return {
        ...state,
        profile: {
          ...state.profile,
          name: action.name,
          email: action.email,
          about: action.about
        }
      };
    }
    case UPDATE_PASSWORD: {
      console.log(state.profile.password === action.oldPassword);
      switch (state.profile.password === action.oldPassword) {
        case true: {
          return {
            ...state,
            profile: { ...state.profile, password: action.newPassword }
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
    default:
      return state;
  }
};

export const updateUser = (name, email, about) => ({
  type: UPDATE_USER,
  name: name,
  email: email,
  about: about
});
export const updatePassword = (oldPassword, newPassword) => ({
  type: UPDATE_PASSWORD,
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

export default profileReducer;
