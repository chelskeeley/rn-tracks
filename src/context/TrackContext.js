import createDataContext from "./createDataContext";

const INITIAL_STATE = [];

const trackReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const actions = {
  fetchTracks: (dispatch) => () => {},
  createTrack: (dispatch) => (name, locations) => {
    console.log("save track", name, locations.length);
  }
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { ...actions },
  INITIAL_STATE
);
