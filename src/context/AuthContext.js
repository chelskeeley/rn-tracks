import { AsyncStorage } from "react-native";

import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const INITIAL_STATE = {
  token: null,
  errorMessage: ""
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { ...INITIAL_STATE, token: action.payload };
    case "clear_error_message":
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

const actions = {
  clearErrorMessage: (dispatch) => () => {
    dispatch({ type: "clear_error_message" });
  },
  signup: (dispatch) => async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signup", {
        email,
        password
      });

      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("mainFlow");
    } catch (e) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up."
      });
    }
  },
  signin: (dispatch) => async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", {
        email,
        password
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("mainFlow");
    } catch (e) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in."
      });
    }
  },
  signout: (dispatch) => {
    return (dispatch) => {
      // somehow sign out
    };
  },
  tryLocalSignin: (dispatch) => async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      dispatch({ type: "signin", payload: token });
      navigate("mainFlow");
    } else {
      navigate("loginFlow");
    }
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { ...actions },
  INITIAL_STATE
);
