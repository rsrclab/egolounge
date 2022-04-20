import * as S from "./elements";
import {
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Chart as BaseChart,
  Tooltip,
  ChartConfiguration
} from "chart.js";
import { ChartProps } from "~/types";
import { useEffect } from "react";
import { MedalIcon } from "~/assets";

//Registering necessary ChartComponents
BaseChart.register(CategoryScale);
BaseChart.register(LinearScale);
BaseChart.register(LineController);
BaseChart.register(LineElement);
BaseChart.register(PointElement);
BaseChart.register([Tooltip]);

//Mostly Chart Styling
const chartConfig = {
  type: "line",
  data: {
    labels: ["", "", "", "", "", "", "", "", "", ""],
    datasets: [{ data: [] as number[] }]
  },
  options: {
    responsive: true,
    elements: {
      line: {
        borderWidth: 2,
        borderColor: "#DEA30A"
      },
      point: {
        radius: 5,
        hoverRadius: 7,
        backgroundColor: "#ffffff",
        borderColor: "#DEA30A",
        borderWidth: 2
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        offset: true,
        min: 1,
        max: 10,
        suggestedMin: 1,
        suggestedMax: 10,

        ticks: {
          maxRotation: 10,
          stepSize: 1,
          font: {
            size: 14
          },
          color: "#ffffff",
          callback: function (value, index) {
            if (index === 9 || index === 8 || index === 7) {
              return "";
            }
            if (index === 0) {
              return "↓ " + value;
            }

            return value;
          }
        },
        reverse: true,
        grid: {
          tickLength: 20,
          color: "rgba(63, 63, 63, 0.8)",
          borderColor: "rgba(63, 63, 63, 0.8)"
        }
      }
    },
    plugins: {
      tooltip: {
        intersect: false,
        callbacks: {
          label: function (context) {
            const yAxis = context.parsed.y;
            if (yAxis === 10) {
              return "Rank less or equal: " + context.formattedValue;
            } else {
              return "Rank: " + context.formattedValue;
            }
          }
        }
      },
      legend: {
        display: false
      }
    }
  }
} as ChartConfiguration;

export const Chart: React.FC<ChartProps> = ({
  width,
  height,
  data,
  tooltipLabelPrefix,
  id,
  ...props
}) => {
  useEffect(() => {
    chartConfig.data.datasets[0].data = data.map(n => {
      if (n.number >= 10) {
        return 10;
      } else {
        return n.number;
      }
    });
    // chartConfig.data.labels = data.map(l => " " + l.number);
    const chart = new BaseChart(id, chartConfig);

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <S.ChartContainer {...props}>
      <canvas id={id} width={width} height={height} />
    </S.ChartContainer>
  );
};
