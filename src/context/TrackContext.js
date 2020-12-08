import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const INITIAL_STATE = [];

const trackReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const actions = {
  fetchTracks: (dispatch) => () => {},
  createTrack: (dispatch) => async (name, locations) => {
    await trackerApi.post("/tracks", { name, locations });
  }
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { ...actions },
  INITIAL_STATE
);
