import React from 'react';
import { useQuery } from "@apollo/client";
import _ from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';

import ApexChart from '../common/ApexChart';
import { ROCKET_TYPE_QUERY } from '../../utils/GraphQlQueries';
import { getLaunchStatusesByRocketType } from '../../utils/common';

function PieChart({ launchSite }) {
  const { data, loading, error } = useQuery(ROCKET_TYPE_QUERY, {
    variables: { launchSite }
  });

  const filteredLaunches = data?.launches
    .map(({ launch_success, rocket }) => ({
      launch_success,
      rocket_type: rocket?.rocket_type,
    }));

  const groupedByRocketType = _.chain(filteredLaunches)
    .groupBy("rocket_type")
    .toPairs()
    .map((launch) => {
      return _.zipObject(["rocket_type", "launch_status"], launch);
    })
    .value();

  const { rocketTypes, launchStatuses } = getLaunchStatusesByRocketType(groupedByRocketType);
  const options = {
    chart: {
      id: 'donut',
    },
    labels: rocketTypes,
  };
  const series = launchStatuses;

  return (
    <>
      {loading && <CircularProgress color="inherit" />}
      {error && <pre>{error?.message}</pre>}
      {!loading && !error &&
        <>
          <div className="pie">
            <h4>{`Launches per Rocket types for site "${launchSite}"`}</h4>
            <ApexChart
              options={options}
              series={series}
              type="pie"
              width="380"
            />
          </div>
        </>
      }
    </>
  )
}

export default PieChart;
