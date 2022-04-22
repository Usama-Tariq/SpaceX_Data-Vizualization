import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client";

import LineChart from './containers/LineChart';
import BarChart from './containers/BarChart';
import PieChart from './containers/PieChart';
import DropDown from './common/DropDown';
import { LAUNCHES_QUERY } from '../utils/GraphQlQueries';

function Dashboard() {
  const { data, loading, error } = useQuery(LAUNCHES_QUERY);
  const [launchSite, setLaunchSite] = useState('');

  const siteNames = Array.from(new Set(
    data?.launches?.map(({ launch_site }) => launch_site?.site_name)
  ));

  useEffect(() => {
    setLaunchSite(siteNames[0]);
  }, [data]);

  const handleChange = (event) => {
    setLaunchSite(event.target.value);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
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

export default Dashboard;
