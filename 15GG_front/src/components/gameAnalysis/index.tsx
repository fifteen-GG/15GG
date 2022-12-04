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
  over-flow-x: hidden;
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
export const playerData = {
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
};

export const GameAnalysis = () => {
  const [liveData, setLiveData] = useState<SocketData>({
    match_data: [
      {
        blue_team_win_rate: 0.5,
        timestamp: 0,
        player_data: [
          playerData,
          playerData,
          playerData,
          playerData,
          playerData,
          playerData,
          playerData,
          playerData,
          playerData,
          playerData,
        ],
      },
    ],
    match_id: '0',
  } as unknown as SocketData);
  const [endData, setEndData] = useState<endData[]>([
    {
      blue_team_win_rate: 0.5,
      timestamp: 0,
      player_data: [
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
      ],
    },
    {
      blue_team_win_rate: 0.5,
      timestamp: 0,
      player_data: [
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
      ],
    },
    {
      blue_team_win_rate: 0.5,
      timestamp: 0,
      player_data: [
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
        playerData,
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
  const [status, setStatus] = useState<gameState>(0);
  const [mode, setMode] = useState<queue_mode>(queue_mode.solo);
  const [date, setDate] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const [winRate, setWinRate] = useState<number>(0.5);
  const [winningRate, setWinningRate] = useState<number[]>([0]);
  const [parse, setParse] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(false);
  const params = new URLSearchParams(window.location.search);
  const matchID: string | null = params.get('match%ID');
  //for incomplete game data
  useEffect(() => {
    const getGameData = async () => {
      setIsLoading(true);
      try {
        await webClient.get(`/riot/match/detail/${matchID}`).then(response => {
          if (response.status === 200) {
            setGameData(response.data);
            setStatus(response.data[0].status);
            setMode(response.data[0].queue_mode);
            setDate(response.data[0].created_at);
            setIsLoading(false);
          }
        });
      } catch (e: any) {
        console.log(e);
      }
    };

    getGameData();
  }, []);

  useEffect(() => {
    if (status === gameState.end && flag === false && matchID) {
      //result 파일 가져오기
      downloadJson(matchID);
    }
  }, [status, matchID]);

  const { responseMessage } = useSocket(state => {
    if (state === SocketStatus.onNewChatReceived) {
      setParse(data => data + 1);
    } else if (state === SocketStatus.onConnectionFailed) {
      console.error('onConnectionFailed');
    } else if (state === SocketStatus.onConnectionOpened) {
      console.log('onConnectionOpened');
    }
  }, matchID?.replace('_', '-'));

  useEffect(() => {
    if (status === gameState.live) {
      if (parse) {
        try {
          let data = JSON.parse(responseMessage);
          setLiveData(data);
        } catch (e) {
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
        rate.push(Math.floor(100 * endData[i].blue_team_win_rate - 50));
      }
      setWinningRate(rate);
      let string: number[] = [0];
      for (let i = 0; i <= endData.length - 1; i++) {
        string.push(endData[i].timestamp);
      }
      setTimeString(string);
    }
  }, [endData]);

  const indexSlider = (values: number) => {
    setLength(values);
  };

  const downloadJson = (match_id: string | null) => {
    const target = match_id?.split('.')[0].replace('_', '-');
    const AWS = require('aws-sdk');
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3();
    s3.getObject(
      { Bucket: '15gg', Key: `${target}.json` },
      function (error: any, data: any) {
        if (error) console.log(error);
        try {
          const downloadData = JSON.parse(data.Body);
          const endResult = downloadData['match_data'];
          setEndData(endResult);
        } catch (error) {
          console.log(error);
        }
      },
    );
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
            <TeamInfoEnd
              Participants={endData[length].player_data}
              blueWin={gameData[2].win}
              redWin={gameData[1].win}
            />
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
