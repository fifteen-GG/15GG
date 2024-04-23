import { useRef, useState, useEffect } from 'react';
import type { ChartData, ChartArea, ChartOptions } from 'chart.js';
import * as Palette from '../../../assets/colorPalette';
import { TimelineGraphContainer } from '../styles/timelineGraph.s';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const labels = [
  '0',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
];

const options = {
  animation: {
    duration: 0,
  },
  responsive: true,
  maintainAspectRatio: false,
  events: [],
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
  },
  showXLabels: 10,
  scales: {
    x: {
      display: true,
      stacked: true,
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.0)',
      },
    },
    y: {
      display: false,
      stacked: true,
      min: -50,
      max: 50,
    },
  },
};

export const datainit = {
  // labels,
  datasets: [
    {
      fill: {
        target: 'origin',
        above: `${Palette.GG_TIMELINE_BLUE}`,
        below: `${Palette.GG_TIMELINE_RED}`,
      },
      data: [0],
      // borderColor: createGradient(chart.ctx, chart.chartArea),
      borderColor: 'red',
      backgroundColor: `${Palette.GG_TIMELINE_BLUE}`,
      lineTension: 0.5,
      pointRadius: 0,
      borderWidth: 1.5,
    },
  ],
};

const createGradient = (
  ctx: CanvasRenderingContext2D,
  area: ChartArea,
  graphType: string,
) => {
  const graphBlue = `${Palette.GG_TIMELINE_BLUE}`;
  const graphRed = `${Palette.GG_TIMELINE_RED}`;
  const graphNeutral = `${Palette.GG_GRFTITLE}`;
  let gradient;

  area.top = 5;
  area.bottom = 45;

  const lineGradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  const blueTeamGradient = ctx.createLinearGradient(
    0,
    area.bottom,
    0,
    area.top,
  );
  const redTeamGradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  lineGradient.addColorStop(1, graphBlue);
  lineGradient.addColorStop(0, graphRed);
  blueTeamGradient.addColorStop(1, graphBlue);
  blueTeamGradient.addColorStop(0, graphNeutral);
  redTeamGradient.addColorStop(1, graphNeutral);
  redTeamGradient.addColorStop(0, graphRed);

  graphType === 'line'
    ? (gradient = lineGradient)
    : graphType === 'red'
    ? (gradient = redTeamGradient)
    : (gradient = blueTeamGradient);

  return gradient;
};
interface propsType {
  winningRate: number[];
  length: number;
  time: number[];
}
const TimelineGraph = (props: propsType) => {
  const chartRef = useRef<ChartJS>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jsonData, setJsonData] = useState<ChartData<'line'>>({
    datasets: [],
  });
  const [cntLabel, setCntLabel] = useState<string[]>(labels);
  useEffect(() => {
    if (props.length + 1 >= 15) {
      let arr = [''];
      let tc = 0;
      props.winningRate.map((propsData, index) => {
        if (Math.trunc(props.time[index] / 60) === tc) {
          arr.push(tc as unknown as string);
          tc += 3;
        } else arr.push('');
      });
      setCntLabel(arr);
    }
    setIsLoading(false);
  }, [props]);
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    const chartData = {
      ...datainit,
      labels: cntLabel,
      datasets: datainit.datasets.map(dataset => ({
        ...dataset,
        data: props.winningRate,
        borderColor: createGradient(chart.ctx, chart.chartArea, 'line'),
        fill: {
          target: 'origin',
          above: createGradient(chart.ctx, chart.chartArea, 'blue'),
          below: createGradient(chart.ctx, chart.chartArea, 'red'),
        },
      })),
    };
    setJsonData(chartData);
  }, [cntLabel]);

  return (
    <>
      {isLoading ? null : (
        <TimelineGraphContainer>
          <Chart
            type="line"
            ref={chartRef}
            options={options}
            data={jsonData}
            width={360}
          />
        </TimelineGraphContainer>
      )}
    </>
  );
};

export default TimelineGraph;
