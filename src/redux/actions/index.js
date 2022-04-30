import {
  LAUNCH_SITE_NAMES,
  LAUNCH_SITE,
  ROCKET_TYPE,
} from "../constants";

export const launchSiteNamesAction = (launches) => {
  return {
    type: LAUNCH_SITE_NAMES,
    payload: launches,
  }
};

export const launchSiteAction = (launches) => {
  return {
    type: LAUNCH_SITE,
    payload: launches
  }
};

export const rocketTypeAction = (launches) => {
  return {
    type: ROCKET_TYPE,
    payload: launches
  }
};
