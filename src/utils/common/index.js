import _ from 'lodash';

export const success = items => _.compact(items.map(item => item.launch_success));
export const failed = items => _.compact(items.map(item => !(item.launch_success)));

const getDetailsByYear = launches => {
  const years = [];
  const launchSuccessful = [];
  const launchFailed = [];

  for (const launch of launches) {
    years.push(launch.launch_year);
    launchSuccessful.push(success(launch.launch_status).length);
    launchFailed.push(failed(launch.launch_status).length);
  }

  return { years, launchSuccessful, launchFailed };
};

export const getDetailsByRocketType = rockets => {
  const rocketTypes = [];
  const launchStatuses = [];

  for (const rocket of rockets) {
    rocketTypes.push(rocket.rocket_type);
    launchStatuses.push((rocket.launch_status).length);
  }

  return { rocketTypes, launchStatuses };
};

export default getDetailsByYear;
