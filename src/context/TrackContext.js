import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const INITIAL_STATE = [];

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

const actions = {
  fetchTracks: (dispatch) => async () => {
    const response = await trackerApi.get("/tracks");
    dispatch({ type: "fetch_tracks", payload: response.data });
  },
  createTrack: (dispatch) => async (name, locations) => {
    await trackerApi.post("/tracks", { name, locations });
  }
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { ...actions },
  INITIAL_STATE
);
