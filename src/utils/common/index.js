import _ from 'lodash';

const successfulLaunchesCount = items => _.compact(items?.map(item => item?.launch_success)).length;
const unsuccessfulLaunchesCount = items => _.compact(items?.map(item => !(item?.launch_success))).length;

const getLaunchStatusesPerYear = launches => {
  const years = [];
  const launchesSuccessful = [];
  const launchesUnsuccessful = [];

  for (const launch of launches) {
    years.push(launch?.launch_year);
    launchesSuccessful.push(successfulLaunchesCount(launch?.launch_status));
    launchesUnsuccessful.push(unsuccessfulLaunchesCount(launch?.launch_status));
  }

  return { years, launchesSuccessful, launchesUnsuccessful };
};

export const getLaunchStatusesByRocketType = rockets => {
  const rocketTypes = [];
  const launchStatuses = [];

  for (const rocket of rockets) {
    rocketTypes.push(rocket?.rocket_type);
    launchStatuses.push((rocket?.launch_status).length);
  }

  return { rocketTypes, launchStatuses };
};

export default getLaunchStatusesPerYear;
