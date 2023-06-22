import { StatsData } from '@/interfaces/pokemon.interface';
import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';

export default function ChartComponent({chartData, color}: {chartData: StatsData[], color: string}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  const labels = chartData.map((item) => item.name.replaceAll('-', ' '));
  const data = {
    labels,
    datasets: [
      {
        data: chartData.map((item) => item.value),
        backgroundColor: color,
      },
    ],
  };
  return (
    <div>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            tooltip: {

            },
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};