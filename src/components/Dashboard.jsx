import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';
import { connect, useDispatch } from "react-redux";

import LineChart from './containers/LineChart';
import BarChart from './containers/BarChart';
import PieChart from './containers/PieChart';
import DropDown from './common/DropDown';
import { LAUNCHES_QUERY } from '../utils/GraphQlQueries';
import { launchSiteNamesAction } from '../redux/actions';

function Dashboard({ launchSiteNamesReducer }) {
  const { data, loading, error } = useQuery(LAUNCHES_QUERY);
  const dispatch = useDispatch();
  const [launchSite, setLaunchSite] = useState('');

  const siteNames = Array.from(new Set(
    launchSiteNamesReducer?.launches?.map(({ launch_site }) => launch_site?.site_name)
  ));

  useEffect(() => {
    if (data) {
      dispatch(
        launchSiteNamesAction(data)
      );
    }
  }, [data]);

  useEffect(() => {
    setLaunchSite(siteNames[0]);
  }, [launchSiteNamesReducer]);

  const handleChange = (event) => {
    setLaunchSite(event.target.value);
  };

  return (
    <>
      {loading && <CircularProgress color="inherit" />}
      {error && <pre>{error?.message}</pre>}
      {!loading && !error &&
        <div className='dashboard'>
          <h1>Data Viz</h1>
          <DropDown
            name={'siteNames'}
            value={launchSite}
            handleChange={handleChange}
            items={siteNames}
          />
          <div className="row">
            <div>
              <LineChart
                launchSite={launchSite}
              />
            </div>
            <div>
              <BarChart
                launchSite={launchSite}
              />
            </div>
          </div>
          <div className="row">
            <div>
              <PieChart
                launchSite={launchSite}
              />
            </div>
          </div>
        </div>
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    launchSiteNamesReducer: state.launchSiteNamesReducer,
  };
};

export default connect(mapStateToProps)(Dashboard);
