import { useRef, useState, useEffect } from 'react';
import type { ChartData, ChartArea } from 'chart.js';
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

const labels = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

const options = {
  responsive: true,
  maintainAspectRatio: false,
  events: [],
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
  },
  scales: {
    x: {
      display: true,
      stacked: true,
      // grid: {
      //   color: (context: any) => {
      //     if (context.tick.value % 1 === 0) {
      //       return '#ffffff';
      //     } else return 'rgba(255, 255, 255, 0.0)';
      //   },
      // },
    },
    y: {
      display: false,
      stacked: true,
      min: -50,
      max: 50,
    },
  },
};
export const data = {
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

  area.top = 8;
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
}
const TimelineGraph = (props: propsType) => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });
  // const [winningRate, setWinningRate] = useState<number[]>([]);
  // console.log(Math.round(50 - 100 * props.winRate));
  const [cntLabel, setCntLabel] = useState<string[]>(labels);
  const [timeCount, setTimeCount] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    console.log(props.winningRate);
    setCount(data => data + 1);
    // if (count >= 15) {
    //   if (Math.floor(props.time / 60) === timeCount) {
    //     setCntLabel([...cntLabel, timeCount as unknown as string]);
    //     setTimeCount(timeCount + 1);
    //     console.log(timeCount);
    //     console.log(cntLabel);
    //   } else setCntLabel([...cntLabel, '']);
    // }
    if (props.length + 1 >= 15) {
      let label: string[] = [...labels];
      for (let i = 15; i <= props.length + 1; i++) {
        // if (i === 60 * timeCount){
        //   label = [...label, timeCount as unknown as string];
        //   setTimeCount
        // }
        label = [...label, ''];
      }
      setCntLabel(label);
      console.log(cntLabel);
    }
    console.log(props.length);
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    const chartData = {
      ...data,
      labels: cntLabel,
      datasets: data.datasets.map(dataset => ({
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
    console.log(count);
    setChartData(chartData);
  }, [props.winningRate, setCount]);

  return (
    <TimelineGraphContainer>
      <Chart
        type="line"
        ref={chartRef}
        options={options}
        data={chartData}
        // height={84}
        width={360}
      />
    </TimelineGraphContainer>
  );
};

export default TimelineGraph;
