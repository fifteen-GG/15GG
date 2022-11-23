import GameInfo from './components/GameInfo';
import TeamStats from './components/TeamStats';
import TeamStatsLive from './components/TeamStatsLive';
import TeamInfo from './components/TeamInfo';
import TeamInfoLive from './components/TeamInfoLive';
import TimelineGraph from './components/TimelineGraph';
import TimelineBarGraph from './components/TimelineBarGraph';
import GameSlider from './components/GameSlider';
import EmptyCover from './components/EmptyCover';
import styled from 'styled-components';
import * as Palette from '../../assets/colorPalette';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSocket, SocketStatus } from './useSocket';
import { gameState } from '../types/enum';
import axios from 'axios';
import {
  teamDetail,
  SocketData,
  socketDetail,
  Participants,
} from '../types/matchDetails';
import LoadingPage from '../userInfo/components/LoadingPage';

const GameAnalysisContainer = styled.div`
  width: 100%;
  @media screen and (max-width: 360px) {
    width: 328px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TimeInfo = styled.div`
  width: 100%;
  display: flex;
  font-size: 12px;
  color: ${Palette.GG_WHITE_100};
  font-weight: 300;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;
export const GameAnalysis = () => {
  const [liveData, setLiveData] = useState<SocketData>({
    timestamp: 0,
    player_data: [
      {
        summonerName: '이름없음',
        championName: '0',
        rank: '0',
        spells: {
          spell1: 0,
          spell2: 0,
        },
        perks: {
          perk: 0,
          perkStyl: 0,
        },
        isDead: false,
        level: 0,
        team: '',
        champLevel: 0,
        items: [],
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
      },
      {
        summonerName: '이름없음',
        championName: '0',
        rank: '0',
        spells: {
          spell1: 0,
          spell2: 0,
        },
        perks: {
          perk: 0,
          perkStyl: 0,
        },
        isDead: false,
        level: 0,
        team: '',
        champLevel: 0,
        items: [],
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
      },
      {
        summonerName: '이름없음',
        championName: '0',
        rank: '0',
        spells: {
          spell1: 0,
          spell2: 0,
        },
        perks: {
          perk: 0,
          perkStyl: 0,
        },
        isDead: false,
        level: 0,
        team: '',
        champLevel: 0,
        items: [],
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
      },
      {
        summonerName: '이름없음',
        championName: '0',
        rank: '0',
        spells: {
          spell1: 0,
          spell2: 0,
        },
        perks: {
          perk: 0,
          perkStyl: 0,
        },
        isDead: false,
        level: 0,
        team: '',
        champLevel: 0,
        items: [],
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
      },
      {
        summonerName: '이름없음',
        championName: '0',
        rank: '0',
        spells: {
          spell1: 0,
          spell2: 0,
        },
        perks: {
          perk: 0,
          perkStyl: 0,
        },
        isDead: false,
        level: 0,
        team: '',
        champLevel: 0,
        items: [],
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
      },
      {
        summonerName: '이름없음',
        championName: '0',
        rank: '0',
        spells: {
          spell1: 0,
          spell2: 0,
        },
        perks: {
          perk: 0,
          perkStyl: 0,
        },
        isDead: false,
        level: 0,
        team: '',
        champLevel: 0,
        items: [],
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
      },
      {
        summonerName: '이름없음',
        championName: '0',
        rank: '0',
        spells: {
          spell1: 0,
          spell2: 0,
        },
        perks: {
          perk: 0,
          perkStyl: 0,
        },
        isDead: false,
        level: 0,
        team: '',
        champLevel: 0,
        items: [],
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
      },
      {
        summonerName: '이름없음',
        championName: '0',
        rank: '0',
        spells: {
          spell1: 0,
          spell2: 0,
        },
        perks: {
          perk: 0,
          perkStyl: 0,
        },
        isDead: false,
        level: 0,
        team: '',
        champLevel: 0,
        items: [],
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
      },
      {
        summonerName: '이름없음',
        championName: '0',
        rank: '0',
        spells: {
          spell1: 0,
          spell2: 0,
        },
        perks: {
          perk: 0,
          perkStyl: 0,
        },
        isDead: false,
        level: 0,
        team: '',
        champLevel: 0,
        items: [],
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
      },
      {
        summonerName: '이름없음',
        championName: '0',
        rank: '0',
        spells: {
          spell1: 0,
          spell2: 0,
        },
        perks: {
          perk: 0,
          perkStyl: 0,
        },
        isDead: false,
        level: 0,
        team: '',
        champLevel: 0,
        items: [],
        kills: 0,
        deaths: 0,
        assists: 0,
        gold: 0,
      },
    ],
  } as unknown as SocketData);
  // const [liveData, setLiveData] = useState<SocketData>();
  // const [liveData, setLiveData] = useState<any>();
  console.log(liveData);
  console.log(liveData.player_data);
  const [gameData, setGameData] = useState([
    {} as teamDetail,
    {} as teamDetail,
  ]);
  console.log(gameData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  console.log(time);
  const [winRate, setWinRate] = useState<number>(0.5);
  console.log(winRate);
  const [winningRate, setWinningRate] = useState<number[]>([0]);
  console.log(winningRate);
  const [parse, setParse] = useState<number>(0);
  console.log(parse);
  const params = new URLSearchParams(window.location.search);
  const matchID = params.get('match%ID');
  console.log(matchID);
  const { state } = useLocation();
  //for incomplete game data
  const getGameData = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_GG_API_ROOT}/riot/match/detail/${matchID}`,
      );
      if (data.status === 200) {
        setGameData(data.data);
      }
      if (data.data) setIsLoading(false);
    } catch (e: any) {
      console.log(e);
    }
  };
  useEffect(() => {
    getGameData();
  }, []);

  const { responseMessage } = useSocket(state => {
    if (state === SocketStatus.onNewChatReceived) {
      setParse(data => data + 1);
    } else if (state === SocketStatus.onConnectionFailed) {
      console.error('onConnectionFailed');
    } else if (state === SocketStatus.onConnectionOpened) {
      console.log('onConnectionOpened');
    }
  });

  useEffect(() => {
    if (state.status === gameState.live) {
      if (parse) {
        let data = JSON.parse(responseMessage);
        setLiveData(data);
      }
    }
  }, [parse, responseMessage]);
  // console.log(liveData);
  useEffect(() => {
    if (state.status === gameState.live) {
      if (parse) {
        setTime(liveData.timestamp);
        setWinRate(liveData.blue_team_win_rate);
        setWinningRate([
          ...winningRate,
          Math.round(50 - 100 * liveData.blue_team_win_rate),
        ]);
      }
    }
  }, [liveData]);
  return (
    <GameAnalysisContainer>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <GameInfo status={state.status} mode={state.mode} date={state.date} />
          {state.status === gameState.none ? <EmptyCover /> : null}
          <TimeInfo>
            경과시간 {Math.trunc(time / 60)}:
            {Math.trunc(time % 60) < 10
              ? '0' + Math.trunc(time % 60)
              : Math.trunc(time % 60)}
          </TimeInfo>
          <TimelineBarGraph winRate={winRate} />
          <TimelineGraph winningRate={winningRate} time={time} />
          {state.status === gameState.end ? <GameSlider /> : null}
          {state.status === gameState.live ? (
            <TeamStatsLive Participants={liveData.player_data} />
          ) : (
            <TeamStats
              redTeam={gameData[0].teamAvgData}
              blueTeam={gameData[1].teamAvgData}
            />
          )}
          {state.status === gameState.live ? (
            <TeamInfoLive Participants={liveData.player_data} />
          ) : (
            <TeamInfo
              redParticipants={gameData[0].participants}
              blueParticipants={gameData[1].participants}
            />
          )}
        </>
      )}
    </GameAnalysisContainer>
  );
};
