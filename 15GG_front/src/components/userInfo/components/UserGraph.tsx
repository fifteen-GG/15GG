import { useRef, useState, useEffect } from 'react';
import type { ChartData } from 'chart.js';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { SummonerInfoType } from '../../types/summonerInfo';

import {
  UserGraphContainer,
  UserGraphImg,
  UserGraphWrapper,
  UserGraphText,
  ColumnLabel as UserGraphLabel,
  ColumnLabel as AvgGraphLabel,
  ColumnBox as UserColumn,
  ColumnBox as AvgColumn,
  ColumnName as UserName,
  ColumnName as AvgName,
} from '../styles/userGraph.s';

import * as Palette from '../../../assets/colorPalette';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const labels = ['Kill', 'Assist', '15min', '30min', 'Gold', 'CS'];

const options = {
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0, // 점 제거
    },
  },
  events: [],
  scales: {
    r: {
      angleLines: {
        color: Palette.GG_RADAR,
      },
      backgroundColor: Palette.GG_RADAR + '80',
      grid: {
        circular: true,
        color: Palette.GG_RADAR,
      },
      ticks: {
        maxTicksLimit: 6,
        display: false,
      },
      pointLabels: {
        font: {
          size: 10,
          lineHeight: '10px',
        },
        color: Palette.GG_WHITE_100,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      // position: 'left' as 'left',
      // position: 'top' as 'top',
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: '',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: Palette.GG_RADARDATABGC,
      borderColor: Palette.GG_RADARDATA,
      borderWidth: 1,
    },
    {
      label: 'Average',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: Palette.GG_RADARAVGBGC,
      borderColor: Palette.GG_GREY_70,
      borderWidth: 1,
    },
  ],
};
interface propsType {
  userName: string;
}
const UserGraph = (props: propsType) => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'radar'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    const chartData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
      })),
    };
    setChartData(chartData);
  }, []);

  return (
    <UserGraphContainer>
      <UserGraphWrapper>
        <UserGraphText>
          <UserGraphLabel>
            <UserColumn
              style={{ backgroundColor: `${Palette.GG_RADARDATA}` }}
            ></UserColumn>
            <UserName>{props.userName}</UserName>
          </UserGraphLabel>
          <AvgGraphLabel>
            <AvgColumn
              style={{ backgroundColor: `${Palette.GG_GREY_70}` }}
            ></AvgColumn>
            <AvgName>Average</AvgName>
          </AvgGraphLabel>
        </UserGraphText>
        <UserGraphImg>
          <Chart
            type="radar"
            ref={chartRef}
            data={chartData}
            options={options}
          />
        </UserGraphImg>
      </UserGraphWrapper>
    </UserGraphContainer>
  );
};

export default UserGraph;
