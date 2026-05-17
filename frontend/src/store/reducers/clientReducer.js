import axiosInstance from "../../api/axiosInstance";
import { loginSuccess, SET_VERIFYING } from "./authReducer";

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "",
  language: "",
};

const SET_USER = "client/SET_USER";
const SET_ROLES = "client/SET_ROLES";
const SET_THEME = "client/SET_THEME";
const SET_LANGUAGE = "client/SET_LANGUAGE";

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const loginUser = (credentials, rememberMe) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    const userData = response.data;

    dispatch(setUser(userData));
    dispatch(loginSuccess(userData));

    if (rememberMe) {
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return userData;
  } catch (error) {
    console.error("Login hatası:", error);
    throw error;
  }
};

export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch({ type: SET_VERIFYING, payload: false });
    return;
  }

  try {
    const response = await axiosInstance.get("/auth/verify");
    const userData = response.data;

    dispatch(setUser(userData));
    dispatch(loginSuccess(userData));

    localStorage.setItem("token", userData.token);
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: SET_VERIFYING, payload: false });
  }
};

export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().client;
  if (roles.length > 0) return;
  try {
    const response = await axiosInstance.get("/roles");
    dispatch(setRoles(response.data));
  } catch (error) {
    console.error("Roles çekilemedi:", error);
  }
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export default clientReducer;
