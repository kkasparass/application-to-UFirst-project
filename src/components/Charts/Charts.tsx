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
import { LogsData, useChartData } from "./hooks/useChartData";

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

export const Charts = ({ data }: { data: LogsData }) => {
  const {
    requestsPerMinuteChartData,
    methodDistributionData,
    answerCodeDistributionData,
    sizeDistributionChartData,
  } = useChartData({ data });

  return (
    <div className="row">
      <div className="col-12 col-md-6 mb-5">
        <h2>Requests per minute</h2>
        <Line data={requestsPerMinuteChartData} />
      </div>
      <div className="col-12 col-md-6 mb-5">
        <h2>Distribution of HTTP methods</h2>
        <Pie data={methodDistributionData} />
      </div>
      <div className="col-12 col-md-6 mb-5">
        <h2>Distribution of HTTP answer codes</h2>
        <Pie data={answerCodeDistributionData} />
      </div>
      <div className="col-12 col-md-6 mb-5">
        <h2>Distribution of the size of the answers</h2>
        <Pie data={sizeDistributionChartData} />
      </div>
    </div>
  );
};
