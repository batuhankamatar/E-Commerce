import axiosInstance from "../../api/axiosInstance";
import { SET_USER } from "../reducers/clientReducer";
import { toast } from "react-toastify";

export const setUser = (user) => ({ type: SET_USER, payload: user });

export const verifyToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  return axiosInstance
    .get("/auth/verify")
    .then((res) => {
      const userData = res.data;
      dispatch(setUser(userData));
      localStorage.setItem("token", userData.token);
    })
    .catch((err) => {
      console.error("Verification failed", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(setUser({}));
    });
};

export const loginUser =
  (credentials, rememberMe, navigate, from) => (dispatch) => {
    return axiosInstance
      .post("/auth/login", credentials)
      .then((res) => {
        const userData = res.data;
        dispatch(setUser(userData));

        if (rememberMe) {
          localStorage.setItem("token", userData.token);
          localStorage.setItem("user", JSON.stringify(userData));
        }

        toast.success(`Welcome back, ${userData.name}!`);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Invalid email or password");
        throw err;
      });
  };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(setUser({}));
  toast.info("Logged out successfully.");
};
