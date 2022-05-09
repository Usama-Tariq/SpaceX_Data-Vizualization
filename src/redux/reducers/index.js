import { combineReducers } from "redux";

import {
  LAUNCH_SITE_NAMES,
  LAUNCH_SITE,
  ROCKET_TYPE,
} from "../constants";

const initialState = [];

const launchSiteNames = (state = initialState, action) => {
  switch (action.type) {
    case LAUNCH_SITE_NAMES:
      return action.payload;
    default:
      return state;
  }
};

const launchSiteDetails = (state = initialState, action) => {
  switch (action.type) {
    case LAUNCH_SITE:
      return action.payload;
    default:
      return state;
  }
};

const rocketTypeDetails = (state = initialState, action) => {
  switch (action.type) {
    case ROCKET_TYPE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  launchSiteNames,
  launchSiteDetails,
  rocketTypeDetails,
})

export default rootReducer;
