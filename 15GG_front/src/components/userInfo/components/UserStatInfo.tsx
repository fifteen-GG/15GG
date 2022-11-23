import { useRef, useState, useEffect } from 'react';
//for chart
import type { ChartData, ChartArea, ChartType } from 'chart.js';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import * as Palette from '../../../assets/colorPalette';
import { Chart } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';
import {
  UserStatInfoContainer,
  UserWinRateWrapper,
  GraphText,
  GraphImg,
  UserInfoText,
  UserInfoTitle,
  UserInfoContent,
  UserInfoSubTitle,
} from '../styles/userStatInfo.s';

ChartJS.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);
const labels = ['Blue', 'Red'];
const options = {
  options: {
    maintainAspectRatio: false,
  },
  cutout: 14,
  events: [],
  plugins: {
    legend: {
      display: false,
    },
  },
};

const data = {
  labels,
  datasets: [
    {
      label: '',
      data: [0, 0],
      backgroundColor: [Palette.GG_DOUGHNUT, Palette.GG_WHITE_100],
      hoverOffset: 1,
      borderWidth: 0,
    },
  ],
};

interface propsType {
  userName: string;
  win_rate: number;
  wins: number;
  losses: number;
  kda_avg: number;
  kills_avg: number;
  deaths_avg: number;
  assists_avg: number;
  prefer_position: {
    TOP?: number;
    JG?: number;
    MID?: number;
    ADC?: number;
    SUP?: number;
    '-': number;
  };
}
export const UserStatInfo = (props: propsType) => {
  // const [userStat, setUserStat] = useState<userStat>(
  //   formatStatInfo(props.summonerInfo),
  // );
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'doughnut'>>({
    datasets: [],
  });
  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }
    const chartData = {
      ...data, //
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        label: props?.userName,
        data: [props?.win_rate, 100 - props?.win_rate],
      })),
    };
    setChartData(chartData);
    chart.update();
  }, []);
  return (
    <UserStatInfoContainer>
      <UserWinRateWrapper>
        <GraphImg>
          <GraphText>{props?.win_rate}%</GraphText>
          <Chart
            ref={chartRef}
            type="doughnut"
            data={chartData}
            options={options}
          />
        </GraphImg>
        <UserInfoText>
          <UserInfoTitle>승률</UserInfoTitle>
          <UserInfoContent>{props?.win_rate}%</UserInfoContent>
          <UserInfoSubTitle>
            {props?.wins}승 {props?.losses}패
          </UserInfoSubTitle>
        </UserInfoText>
      </UserWinRateWrapper>
      <UserInfoText>
        <UserInfoTitle>KDA</UserInfoTitle>
        <UserInfoContent>{props?.kda_avg}</UserInfoContent>
        <UserInfoSubTitle>
          {props?.kills_avg}/{props?.deaths_avg}/{props.assists_avg}
        </UserInfoSubTitle>
      </UserInfoText>
      <UserInfoText>
        <UserInfoTitle>선호 포지션</UserInfoTitle>
        <UserInfoContent>{Object.keys(props?.prefer_position)}</UserInfoContent>
        <UserInfoSubTitle>
          {Object.values(props?.prefer_position)}%
        </UserInfoSubTitle>
      </UserInfoText>
    </UserStatInfoContainer>
  );
};
export default UserStatInfo;
