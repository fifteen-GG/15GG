import { useRef, useState, useEffect } from 'react';
import type { ChartData } from 'chart.js';
import * as Palette from '../../../assets/colorPalette';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import {
  TimelineBarContainer,
  GraphWrapper,
  RateWrapper,
  WinningRate,
  GraphTitle,
} from '../styles/timelineBarGraph.s';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
export const options = {
  indexAxis: 'y' as const,
  maintainAspectRatio: false,
  events: [],
  scales: {
    x: {
      max: 100,
      display: false,
      stacked: true,
      grid: {
        offset: true,
      },
    },
    y: {
      max: 100,
      display: false,
      stacked: true,
    },
  },
  elements: {
    bar: {
      borderWidth: 1,
      borderRadius: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'right' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};
const labels = [''];
const data = {
  labels,
};

interface propsType {
  winRate: number;
}

const TimelineBarGraph = (props: propsType) => {
  const chartRef = useRef<ChartJS>(null);
  const [blueWinningRate, setBlueWinningRate] = useState<number>(0);
  console.log(50 - 100 * props.winRate);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  });
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    const chartData = {
      ...data,
      // datasets: data.datasets.map(dataset => ({
      //   ...dataset,
      //   data: [100 - props?.winRate * 100,100],
      // })),
      datasets: [
        {
          label: 'Dataset 1',
          data: [100 - props.winRate * 100],
          borderColor: `${Palette.GG_TIMELINE_BARGRAPH_RED}`,
          backgroundColor: `${Palette.GG_TIMELINE_BARGRAPH_RED}`,
          borderWidth: 0,
        },
        {
          label: 'Dataset 2',
          data: [100],
          borderColor: `${Palette.GG_TIMELINE_BARGRAPH_BORDER_BLUE}`,
          backgroundColor: `${Palette.GG_TIMELINE_BARGRAPH_BLUE}`,
          borderWidth: 0,
        },
      ],
    };
    setChartData(chartData);
    setBlueWinningRate(props.winRate);
  }, [props.winRate]);

  return (
    <TimelineBarContainer>
      <GraphWrapper>
        <Chart
          type="bar"
          ref={chartRef}
          data={chartData}
          options={options}
          height="5px"
        />
      </GraphWrapper>
      <RateWrapper>
        <WinningRate>{Math.round(100 - blueWinningRate * 100)}%</WinningRate>
        <GraphTitle>승률</GraphTitle>
        <WinningRate>{Math.round(blueWinningRate * 100)}%</WinningRate>
      </RateWrapper>
    </TimelineBarContainer>
  );
};

export default TimelineBarGraph;
