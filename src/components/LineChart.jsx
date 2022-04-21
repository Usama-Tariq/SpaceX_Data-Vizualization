import React from 'react'
import { useQuery } from "@apollo/client";
import Chart from "react-apexcharts";
import _ from 'lodash';

import { SITE_NAME_QUERY } from '../utils/GraphQlQueries';
import getDetailsByYear from '../utils/common';

function LineChart({ launchSite }) {
  const { data, loading, error } = useQuery(SITE_NAME_QUERY(launchSite));

  if (loading) return "Loading...";

  if (error) return <pre>{error.message}</pre>

  const groupedByYear = _.chain(data.launches)
    .groupBy("launch_year")
    .toPairs()
    .map((launch) => {
      return _.zipObject(["launch_year", "launch_status"], launch);
    })
    .value();

  const { years, launchSuccessful, launchFailed } = getDetailsByYear(groupedByYear);

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
      name: `Success`,
      data: launchSuccessful
    },
    {
      name: `Fail`,
      data: launchFailed
    },
  ];

  return (
    <>
      <h4>{`Launch trends of Site "${launchSite}" over the Years`}</h4>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        width="500"
      />
    </>
  )
}

export default LineChart;
