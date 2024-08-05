import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Data {
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    data: number[];
  }[];
}

interface Options {
  scales: {
    y: {
      beginAtZero: boolean;
    };
  };
}
interface BarChartProps {
  labels: string[];
  datasetData: number[];
}


const BarChartComponent: React.FC<BarChartProps> = ({labels,datasetData}) => {
  const data: Data = {
    labels: labels,
    datasets: [
      {
        label: 'כשירים',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: datasetData,
      },
    ],
  };

  const options: Options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  return (
    <Box >
      <Bar data={data} options={options} />
    </Box>
  );
};

export default BarChartComponent;
