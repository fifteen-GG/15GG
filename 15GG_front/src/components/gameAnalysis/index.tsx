import GameInfo from './components/GameInfo';
import TeamStats from './components/TeamStats';
import TeamStatsLive from './components/TeamStatsLive';
import TeamStatsEnd from './components/TeamStatsEnd';
import TeamInfo from './components/TeamInfo';
import TeamInfoLive from './components/TeamInfoLive';
import TeamInfoEnd from './components/TeamInfoEnd';
import TimelineGraph from './components/TimelineGraph';
import TimelineBarGraph from './components/TimelineBarGraph';
import GameSlider from './components/GameSlider';
import EmptyCover from './components/EmptyCover';
import styled from 'styled-components';
import * as Palette from '../../assets/colorPalette';
import { useState, useEffect } from 'react';
import { useSocket, SocketStatus } from './useSocket';
import { gameState, queue_mode } from '../types/enum';
import axios from 'axios';
import endResultData from '../../assets/sample_live_result.json';

import {
  teamDetail,
  SocketData,
  matchData,
  endData,
  matchDetail,
  Participants,
} from '../types/matchDetails';
import LoadingPage from '../userInfo/components/LoadingPage';
import webClient from '../../WebClient';

const GameAnalysisContainer = styled.div`
  width: 100%;
  @media screen and (max-width: 360px) {
    width: 328px;
  }
`;
const GameAnalysisWrapper = styled.div`
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
    match_data: [
      {
        blue_team_win_rate: 0,
        timestamp: 0,
        player_data: [
          {
            summonerName: '이름없음',
            championName: '0',
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
      },
    ],
    match_id: '0',
  } as unknown as SocketData);
  const [endData, setEndData] = useState<endData[]>([
    {
      blue_team_win_rate: 0,
      timestamp: 0,
      player_data: [
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
      ],
    },
    {
      blue_team_win_rate: 0,
      timestamp: 0,
      player_data: [
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
      ],
    },
    {
      blue_team_win_rate: 0,
      timestamp: 0,
      player_data: [
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
        {
          summonerName: '이름없음',
          championName: '0',
          isDead: false,
          level: 0,
          team: '',
          items: [],
          kills: 0,
          deaths: 0,
          assists: 0,
          gold: 0,
        },
      ],
    },
  ]);
  const [gameData, setGameData] = useState([
    {} as teamDetail,
    {} as teamDetail,
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [timeString, setTimeString] = useState<number[]>([0]);
  const [status, setStatus] = useState<gameState>(2);
  const [mode, setMode] = useState<queue_mode>(queue_mode.solo);
  const [date, setDate] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const [winRate, setWinRate] = useState<number>(0.5);
  const [winningRate, setWinningRate] = useState<number[]>([0]);
  const [parse, setParse] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(false);
  const params = new URLSearchParams(window.location.search);
  const matchID = params.get('match%ID');
  //for incomplete game data
  useEffect(() => {
    const getGameData = async () => {
      setIsLoading(true);
      try {
        const data = await webClient.get(`/riot/match/detail/${matchID}`);
        if (data.status === 200) {
          setGameData(data.data);
          setStatus(data.data[0].status);
          setMode(data.data[0].queue_mode);
          setDate(data.data[0].created_at);
          setIsLoading(false);
        }
      } catch (e: any) {
        console.log(e);
      }
    };

    getGameData();
  }, []);

  useEffect(() => {
    if (status === gameState.end && flag === false) {
      //result 파일 가져오기
      let endResult: endData[] = [...endResultData];
      setEndData(endResult);
    }

    setWinningRate(rate);
    let string: number[] = [0];
    for (let i = 0; i <= endData.length - 1; i++) {
      string.push(endData[i].timestamp);
    }
    setTimeString(string);
  }, [status]);

  const { responseMessage } = useSocket(state => {
    if (state === SocketStatus.onNewChatReceived) {
      setParse(data => data + 1);
    } else if (state === SocketStatus.onConnectionFailed) {
      console.error('onConnectionFailed');
    } else if (state === SocketStatus.onConnectionOpened) {
      console.log('onConnectionOpened');
    }
  }, matchID?.replace('_', '-'));
  // useEffect(() => {
  //   if (status === gameState.end) {
  //     let rate: number[] = [0];
  //     for (let i = 0; i <= endData.length - 1; i++) {
  //       rate.push(Math.floor(50 - 100 * endData[i].blue_team_win_rate));
  //     }
  //     setWinningRate(rate);
  //     console.log(winningRate);
  //   }
  // }, [, setStatus, status]);
  useEffect(() => {
    if (status === gameState.live) {
      if (parse) {
        try {
          let data = JSON.parse(responseMessage);
          setLiveData(data);
        } catch (e) {
          console.log(liveData.match_data);
          setEndData(liveData.match_data);
          webClient
            .post('/match/update/status', {
              match_id: matchID,
              status: 2,
            })
            .then(response => {
              if (response.status === 200) {
                setFlag(true);
                setStatus(2);
              }
            });
        }
      }
    }
  }, [parse, responseMessage]);
  useEffect(() => {
    if (status === gameState.live) {
      if (parse) {
        setTime(liveData.match_data[liveData.match_data.length - 1].timestamp);
        setWinRate(
          liveData.match_data[liveData.match_data.length - 1]
            .blue_team_win_rate,
        );
        let rate: number[] = [0];
        liveData.match_data.map((value, index) => {
          rate.push(
            Math.floor(
              100 * liveData.match_data[index].blue_team_win_rate - 50,
            ),
          );
        });
        setWinningRate(rate);
        let string: number[] = [0];
        liveData.match_data.map((value, index) => {
          string.push(liveData.match_data[index].timestamp);
        });
        setTimeString(string);
      }
    }
  }, [liveData]);

  useEffect(() => {
    if (status === gameState.end) {
      if (endData.length !== 0) {
        setTime(endData[length].timestamp);
        setWinRate(endData[length].blue_team_win_rate);
      }
    }
  }, [length]);

  useEffect(() => {
    if (status === gameState.end) {
      let rate: number[] = [0];
      for (let i = 0; i <= endData.length - 1; i++) {
        rate.push(Math.floor(50 - 100 * endData[i].blue_team_win_rate));
      }
      setWinningRate(rate);
    }
  }, [endData]);

  const indexSlider = (values: number) => {
    setLength(values);
  };
  return (
    <GameAnalysisContainer>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <GameAnalysisWrapper>
          <GameInfo status={status} mode={mode} date={date} />
          {status === gameState.none ? <EmptyCover /> : null}
          <TimeInfo>
            경과시간 {Math.floor(time / 60)}:
            {Math.floor(time % 60) < 10
              ? '0' + Math.floor(time % 60)
              : Math.floor(time % 60)}
          </TimeInfo>
          <TimelineBarGraph winRate={winRate} />
          {status === gameState.end ? (
            <TimelineGraph
              winningRate={winningRate}
              length={endData.length - 1}
              time={timeString}
            />
          ) : (
            <TimelineGraph
              winningRate={winningRate}
              length={liveData.match_data.length - 1}
              time={timeString}
            />
          )}
          {status === gameState.end ? (
            <GameSlider indexSlider={indexSlider} length={endData.length - 1} />
          ) : null}
          {status === gameState.live ? (
            <TeamStatsLive
              Participants={
                liveData.match_data[liveData.match_data.length - 1].player_data
              }
            />
          ) : status === gameState.end ? (
            <TeamStatsEnd Participants={endData[length].player_data} />
          ) : (
            <TeamStats
              blueTeam={gameData[2].team_avg_data}
              redTeam={gameData[1].team_avg_data}
            />
          )}
          {status === gameState.live ? (
            <TeamInfoLive
              Participants={
                liveData.match_data[liveData.match_data.length - 1].player_data
              }
            />
          ) : status === gameState.end ? (
            <TeamInfoEnd Participants={endData[length].player_data} />
          ) : (
            <TeamInfo
              blueWin={gameData[2].win}
              redWin={gameData[1].win}
              blueParticipants={gameData[2].participants}
              redParticipants={gameData[1].participants}
            />
          )}
        </GameAnalysisWrapper>
      )}
    </GameAnalysisContainer>
  );
};
