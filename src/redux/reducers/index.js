import { combineReducers } from "redux";

import {
  LAUNCH_SITE_NAMES,
  LAUNCH_SITE,
  ROCKET_TYPE,
} from "../constants";

const initialState = {};

const launchSiteNames = (state = initialState, { type, payload }) => {
  switch (type) {
    case LAUNCH_SITE_NAMES:
      return {
        ...state,
        launches: payload.launches,
      };
    default:
      return state;
  }
};

const launchSiteDetails = (state = initialState, { type, payload }) => {
  switch (type) {
    case LAUNCH_SITE:
      return {
        ...state,
        launches: payload.launches,
      };
    default:
      return state;
  }
};

const rocketTypeDetails = (state = initialState, { type, payload }) => {
  switch (type) {
    case ROCKET_TYPE:
      return {
        ...state,
        launches: payload.launches,
      };
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
