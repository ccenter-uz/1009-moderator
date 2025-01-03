import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FC } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const styles = {
  width: "100%",
  height: "100%",
  padding: "20px",
  borderRadius: "6px",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)",
};
const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 200, 300, 400, 500, 600, 700],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: [50, 100, 150, 200, 250, 300, 350],
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Dataset 3",
      data: [200, 300, 400, 500, 600, 700, 800],
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

export const DashboardBarChart: FC = () => {
  return (
    <div style={styles}>
      <Bar data={data} options={options} />
    </div>
  );
};
