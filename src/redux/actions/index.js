import {
  LAUNCH_SITE_NAMES,
  LAUNCH_SITE,
  ROCKET_TYPE,
} from "../constants";

export const launchSiteNamesReceived = (launches) => {
  return {
    type: LAUNCH_SITE_NAMES,
    payload: launches,
  }
};

export const launchSiteReceived = (launches) => {
  return {
    type: LAUNCH_SITE,
    payload: launches
  }
};

export const rocketTypeReceived = (launches) => {
  return {
    type: ROCKET_TYPE,
    payload: launches
  }
};
