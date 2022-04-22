import React from 'react'
import { useQuery } from "@apollo/client";
import _ from 'lodash';

import ApexChart from '../common/ApexChart';
import { SITE_NAME_QUERY } from '../../utils/GraphQlQueries';
import getLaunchStatusesPerYear from '../../utils/common';

function LineChart({ launchSite }) {
  const { data, loading, error } = useQuery(SITE_NAME_QUERY(launchSite));

  const groupedByYear = _.chain(data?.launches)
    .groupBy("launch_year")
    .toPairs()
    .map((launch) => {
      return _.zipObject(["launch_year", "launch_status"], launch);
    })
    .value();

  const { years, launchesSuccessful, launchesUnsuccessful } = getLaunchStatusesPerYear(groupedByYear);

  const chartOptions = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: years
    }
  };

  const chartSeries = [
    {
      name: `Fail`,
      data: launchesUnsuccessful
    },
    {
      name: `Success`,
      data: launchesSuccessful
    },
  ];

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{error?.message}</pre>}
      {!loading && !error &&
        <>
          <h4>{`Launch trends of Site "${launchSite}" over the Years`}</h4>
          <ApexChart
            options={chartOptions}
            series={chartSeries}
            type="line"
            width="500"
          />
        </>
      }
    </>
  )
}

export default LineChart;
