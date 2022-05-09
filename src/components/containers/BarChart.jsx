import React, { useEffect } from 'react'
import { useQuery } from "@apollo/client";
import _ from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from "react-redux";

import ApexChart from '../common/ApexChart';
import { LAUNCH_SITE_QUERY } from '../../utils/GraphQlQueries';
import getLaunchStatusesPerYear from '../../utils/common';
import { launchSiteReceived } from '../../redux/actions';

function BarChart({ launchSite }) {
  const { data: launchesData, loading, error } = useQuery(LAUNCH_SITE_QUERY, {
    variables: { launchSite }
  });
  const dispatch = useDispatch();
  const launchSiteDetails = useSelector((state) => state.launchSiteDetails);

  useEffect(() => {
    launchesData
      && dispatch(
        launchSiteReceived(launchesData)
      );
  }, [launchesData]);

  const groupedByYear = _.chain(launchSiteDetails?.launches)
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
      {loading && <CircularProgress color="inherit" />}
      {error && <pre>{error?.message}</pre>}
      {!loading && !error &&
        <>
          <h4>{`Launch statuses of Site "${launchSite}" per Year`}</h4>
          <ApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            width="500"
          />
        </>
      }
    </>
  )
}

export default BarChart;
