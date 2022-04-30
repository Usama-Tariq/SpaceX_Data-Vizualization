import React, { useEffect } from 'react'
import { useQuery } from "@apollo/client";
import _ from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';
import { connect, useDispatch } from "react-redux";

import ApexChart from '../common/ApexChart';
import { LAUNCH_SITE_QUERY } from '../../utils/GraphQlQueries';
import getLaunchStatusesPerYear from '../../utils/common';
import { launchSiteAction } from '../../redux/actions';

function LineChart({ launchSite, launchSiteReducer }) {
  const { data, loading, error } = useQuery(LAUNCH_SITE_QUERY, {
    variables: { launchSite }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(
        launchSiteAction(data)
      );
    }
  }, [data]);

  const groupedByYear = _.chain(launchSiteReducer?.launches)
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

const mapStateToProps = (state) => {
  return {
    launchSiteReducer: state.launchSiteReducer,
  };
};

export default connect(mapStateToProps)(LineChart);
