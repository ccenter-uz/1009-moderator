import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FC } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const styles = {
  width: "100%",
  height: "fit-content",
  padding: "20px",
  borderRadius: "6px",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)",
};

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 133,0.7)",
        "rgba(54, 162, 235,0.7)",
        "rgba(255, 206, 86,0.7)",
        "rgba(75, 192, 192,0.7)",
        "rgba(153, 102, 255,0.7)",
        "rgba(255, 159, 64,0.7)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
export const DashboardDonutChart: FC = () => {
  return (
    <div style={styles}>
      <Doughnut data={data} options={{ responsive: true }} />
    </div>
  );
};
