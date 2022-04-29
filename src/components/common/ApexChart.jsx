import React from 'react';
import Chart from "react-apexcharts";


function ApexChart({
  options,
  series,
  type,
  width,
}) {
  return (
    <Chart
      options={options}
      series={series}
      type={type}
      width={width}
    />
  )
}

export default ApexChart;
