const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGOUT = "auth/LOGOUT";

export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
export const logout = () => ({ type: LOGOUT });

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case LOGOUT:
      return { ...state, user: null, token: null, isLoggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
