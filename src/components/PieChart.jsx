import React from 'react';
import { useQuery } from "@apollo/client";
import Chart from 'react-apexcharts';
import _ from 'lodash';

import { ROCKET_TYPE_QUERY } from '../utils/GraphQlQueries';
import { getDetailsByRocketType } from '../utils/common';

function PieChart({ launchSite }) {
  const { data, loading, error } = useQuery(ROCKET_TYPE_QUERY(launchSite));

  if (loading) return "Loading...";

  if (error) return <pre>{error.message}</pre>

  const filteredLaunches = data.launches
    .map(({ launch_success, rocket }) => ({
      launch_success,
      rocket_type: rocket.rocket_type,
    }));

  const groupedByRocketType = _.chain(filteredLaunches)
    .groupBy("rocket_type")
    .toPairs()
    .map((launch) => {
      return _.zipObject(["rocket_type", "launch_status"], launch);
    })
    .value();

  const { rocketTypes, launchStatuses } = getDetailsByRocketType(groupedByRocketType);
  const options = {
    chart: {
      id: 'donut',
    },
    labels: rocketTypes,
  };
  const series = launchStatuses;

  return (
    <>
      <div className="pie">
        <h4>{`Launches per Rocket types for site "${launchSite}"`}</h4>
        <Chart
          options={options}
          series={series}
          type="pie"
          width="380"
        />
      </div>
    </>
  )
}

export default PieChart;
