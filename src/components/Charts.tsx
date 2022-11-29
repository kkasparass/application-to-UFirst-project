import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { useChartData } from "./hooks/useChartData";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export const Charts = () => {
  const {
    requestsPerMinuteChartData,
    methodDistributionData,
    answerCodeDistributionData,
    sizeDistributionChartData,
  } = useChartData();

  return (
    <div className="container row">
      <div className="col-12 col-md-6 mb-5">
        <h1>Requests per minute</h1>
        <Line data={requestsPerMinuteChartData} />
      </div>
      <div className="col-12 col-md-6 mb-5">
        <h1>Distribution of HTTP methods</h1>
        <Pie data={methodDistributionData} />
      </div>
      <div className="col-12 col-md-6 mb-5">
        <h1>Distribution of HTTP answer codes</h1>
        <Pie data={answerCodeDistributionData} />
      </div>
      <div className="col-12 col-md-6 mb-5">
        <h1>Distribution of the size of the answers</h1>
        <Pie data={sizeDistributionChartData} />
      </div>
    </div>
  );
};
