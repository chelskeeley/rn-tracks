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
    case "signup":
      return { ...INITIAL_STATE, token: action.payload };
    default:
      return state;
  }
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signup", {
      email,
      password
    });

    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ action: "signup", payload: response.data.token });
    navigate("mainFlow");
  } catch (e) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up."
    });
  }
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    console.log(email, password);
    // try to sign in
    // handle success by updating state
    // handle failure by showing error message
  };
};

const signout = (dispatch) => {
  return (dispatch) => {
    // somehow sign out
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  INITIAL_STATE
);
