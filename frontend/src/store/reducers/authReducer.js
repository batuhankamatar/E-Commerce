export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGOUT = "auth/LOGOUT";
export const SET_VERIFYING = "auth/SET_VERIFYING";

const tokenInStorage = localStorage.getItem("token");

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: tokenInStorage || null,
  isLoggedIn: !!tokenInStorage,
  isVerifying: !!tokenInStorage,
};

export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
export const logout = () => ({ type: LOGOUT });
export const setVerifying = (payload) => ({ type: SET_VERIFYING, payload });

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
        isVerifying: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
        isVerifying: false,
      };
    case SET_VERIFYING:
      return {
        ...state,
        isVerifying: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
