import { useMemo } from "react";
export type LogsData = {
  host: string;
  datetime: {
    day: string;
    hour: string;
    minute: string;
    second: string;
  };
  request: {
    method: string;
    url: string;
    protocol: string;
    protocol_version: string;
  };
  response_code: string;
  document_size: string;
}[];

export const useChartData = ({ data }: { data: LogsData }) => {
  const chartVariables = useMemo(() => {
    let methodDistributionCounter: { [key: string]: number } = {};
    let requestsPerMinute: { [key: string]: number } = {};
    let answerCodeDistributionCounter: { [key: string]: number } = {};
    let sizeDistributionCounter: { small: number; large: number } = {
      small: 0,
      large: 0,
    };
    data.forEach(
      ({
        request: { method },
        response_code,
        datetime: { day, hour, minute },
        document_size,
      }) => {
        const dateCountKey = `${day}:${hour}:${minute}`;
        methodDistributionCounter[method] = methodDistributionCounter[method]
          ? methodDistributionCounter[method] + 1
          : 1;
        answerCodeDistributionCounter[response_code] =
          answerCodeDistributionCounter[response_code]
            ? answerCodeDistributionCounter[response_code] + 1
            : 1;
        requestsPerMinute[dateCountKey] = requestsPerMinute[dateCountKey]
          ? requestsPerMinute[dateCountKey] + 1
          : 1;
        if (response_code === "200") {
          if (Number(document_size) < 1000) {
            sizeDistributionCounter.small++;
          }
          if (Number(document_size) >= 1000) {
            sizeDistributionCounter.large++;
          }
        }
      }
    );
    return {
      methodDistributionCounter,
      requestsPerMinute,
      answerCodeDistributionCounter,
      sizeDistributionCounter,
    };
  }, [data]);

  const methodDistributionData = {
    labels: Object.keys(chartVariables.methodDistributionCounter),
    datasets: [
      {
        label: "methods used",
        data: Object.values(chartVariables.methodDistributionCounter),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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

  const answerCodeDistributionData = {
    labels: Object.keys(chartVariables.answerCodeDistributionCounter),
    datasets: [
      {
        label: "methods used",
        data: Object.values(chartVariables.answerCodeDistributionCounter),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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

  const requestsPerMinuteChartData = {
    labels: Object.keys(chartVariables.requestsPerMinute),
    datasets: [
      {
        label: "rpm",
        data: Object.values(chartVariables.requestsPerMinute),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const sizeDistributionChartData = {
    labels: Object.keys(chartVariables.sizeDistributionCounter),
    datasets: [
      {
        label: "methods used",
        data: Object.values(chartVariables.sizeDistributionCounter),
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return {
    methodDistributionData,
    answerCodeDistributionData,
    requestsPerMinuteChartData,
    sizeDistributionChartData,
  };
};
