import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import LineChart from './containers/LineChart';
import BarChart from './containers/BarChart';
import PieChart from './containers/PieChart';
import DropDown from './common/DropDown';
import { LAUNCHES_QUERY } from '../utils/GraphQlQueries';
import { launchSiteNamesReceived } from '../redux/actions';

function Dashboard() {
  const { data: launchesData, loading, error } = useQuery(LAUNCHES_QUERY);
  const dispatch = useDispatch();
  const launchSiteNames = useSelector((state) => state.launchSiteNames);
  const [launchSite, setLaunchSite] = useState('');

  const siteNames = Array.from(new Set(
    launchSiteNames?.launches?.map(({ launch_site }) => launch_site?.site_name)
  ));

  useEffect(() => {
    launchesData
      && dispatch(
        launchSiteNamesReceived(launchesData)
      );
  }, [launchesData]);

  useEffect(() => {
    setLaunchSite(siteNames[0]);
  }, [launchSiteNames]);

  const handleChange = (event) => {
    setLaunchSite(event.target.value);
  };

  return (
    <>
      {loading && <CircularProgress color="inherit" />}
      {error && <pre>{error?.message}</pre>}
      {!loading && !error &&
        <Container>
          <h1>Data Viz</h1>
          <DropDown
            name={'siteNames'}
            value={launchSite}
            handleChange={handleChange}
            items={siteNames}
          />
          <Row>
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
          </Row>
          <Row>
            <div>
              <PieChart
                launchSite={launchSite}
              />
            </div>
          </Row>
        </Container>
      }
    </>
  )
}

export default Dashboard;

const Container = styled.div`
  padding: 2.5rem;

  h1,
	h4 {
		text-align: center;
	}
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem;
`;
