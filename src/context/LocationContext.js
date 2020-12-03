import createDataContext from "./createDataContext";

const INITIAL_STATE = {
  recording: false,
  locations: [],
  currentLocation: null
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    default:
      return state;
  }
};

const actions = {
  startRecording: (dispatch) => {},
  stopRecording: (dispatch) => {},
  addLocation: (dispatch) => {
    return (location) => {
      dispatch({ type: "add_current_location", payload: location });
    };
  }
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { ...actions },
  INITIAL_STATE
);
