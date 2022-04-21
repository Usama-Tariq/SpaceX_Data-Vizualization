import React, { useState } from 'react'
import { useQuery } from "@apollo/client";

import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import { LAUNCHES_QUERY } from '../utils/GraphQlQueries';

function Dashboard() {
  const { data, loading, error } = useQuery(LAUNCHES_QUERY);
  const [launchSite, setLaunchSite] = useState('');

  if (loading) return "Loading...";

  if (error) return <pre>{error.message}</pre>

  const siteNames = new Set(
    data.launches.map(({ launch_site }) => launch_site.site_name)
  );

  const handleChange = (event) => {
    setLaunchSite(event.target.value);
  };

  return (
    <div className='dashboard'>
      <h1>Data Viz</h1>
      <select
        name='site'
        value={launchSite}
        onChange={(e) => handleChange(e)}
      >
        <option disabled selected></option>
        {[...siteNames].map(site => (
          <option
            key={site}
            value={site}
          >
            {site}
          </option>
        ))}
      </select>
      {
        launchSite === ''
          ? <p>Plz</p>
          : (
            <>
              <div className="row">
                <div>
                  <LineChart
                    launchSite={launchSite}
                    // launchSite={launchSite === '' ? [...siteNames][0] : launchSite}
                    chartType={"line"}
                  />
                </div>
                <div>
                  <BarChart
                    launchSite={launchSite}
                    // launchSite={launchSite === '' ? [...siteNames][0] : launchSite}
                    chartType={"bar"}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <PieChart
                    launchSite={launchSite}
                  // launchSite={launchSite === '' ? [...siteNames][0] : launchSite}
                  />
                </div>
              </div>
            </>
          )
      }
    </div>
  )
}

export default Dashboard;
