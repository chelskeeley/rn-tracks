import createDataContext from "./createDataContext";

const initialState = {
  isSignedIn: false
};

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return ({ email, password }) => {
    // make api request to sign up with that email and password
    // if we sign up, modify our state, and say that we are authenticated
    // if signing up fails, we probably need to reflect an error message somewhere
  };
};

const signin = (dispatch) => {
  return ({ email, password }) => {
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
  initialState
);
