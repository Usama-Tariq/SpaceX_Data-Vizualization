import { combineReducers } from "redux";

import {
  LAUNCH_SITE_NAMES,
  LAUNCH_SITE,
  ROCKET_TYPE,
} from "../constants";

const initialState = [];

const launchSiteNamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAUNCH_SITE_NAMES:
      return action.payload;
    default:
      return state;
  }
};

const launchSiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAUNCH_SITE:
      return action.payload;
    default:
      return state;
  }
};

const rocketTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROCKET_TYPE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  launchSiteNamesReducer,
  launchSiteReducer,
  rocketTypeReducer,
})

export default rootReducer;
