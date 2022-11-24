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
import { gameState, queue_mode } from '../types/enum';
import axios from 'axios';
import sample_live_result from '../../assets/sample_live_result.json';

import {
  teamDetail,
  SocketData,
  matchData,
  socketDetail,
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
      },
    ],
    match_id: '0',
  } as unknown as SocketData);
  const [endData, setEndData] = useState<matchData[]>([]);
  console.log(liveData.match_data);
  console.log(liveData.match_data[liveData.match_data.length - 1].timestamp);
  const [gameData, setGameData] = useState([
    {} as teamDetail,
    {} as teamDetail,
  ]);
  // console.log(gameData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [status, setStatus] = useState<gameState>(gameState.live);
  const [mode, setMode] = useState<queue_mode>(queue_mode.solo);
  const [date, setDate] = useState<string>('2022년 11월 23일');
  console.log(time);
  const [length, setLength] = useState<number>(liveData.match_data.length - 1);
  console.log(liveData.match_data.length - 1);
  console.log(length);
  const [winRate, setWinRate] = useState<number>(0.5);
  const [winningRate, setWinningRate] = useState<number[]>([0]);
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
      const data = await webClient.get(`/riot/match/detail/${matchID}`);
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
  console.log(sample_live_result);
  useEffect(() => {
    if (responseMessage === 'Game ended' || status === gameState.end) {
      setStatus(gameState.end);
      console.log(sample_live_result);
      // setEndData(sample_live_result);
      // console.log(data);
    }
    if (status === gameState.live) {
      if (parse) {
        let data = JSON.parse(responseMessage);
        setLiveData(data);
        console.log(data);
      }
    }
  }, [parse, responseMessage]);
  useEffect(() => {
    if (status === gameState.live) {
      if (parse) {
        setLength(liveData.match_data.length - 1);
        setTime(liveData.match_data[liveData.match_data.length - 1].timestamp);
        setWinRate(
          liveData.match_data[liveData.match_data.length - 1]
            .blue_team_win_rate,
        );
        let rate: number[] = [0];
        liveData.match_data.map((value, index) => {
          rate.push(
            Math.floor(
              50 - 100 * liveData.match_data[index].blue_team_win_rate,
            ),
          );
        });
        setWinningRate(rate);
      }
    }
    if (status === gameState.end) {
      setTime(endData[length].timestamp);
      setWinRate(endData[length].blue_team_win_rate);
      let rate: number[] = [0];
      for (let i = 0; i <= length; i++) {
        rate.push(Math.floor(50 - 100 * endData[i].blue_team_win_rate));
      }
      setWinningRate(rate);
    }
  }, [liveData]);
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
          <TimelineGraph winningRate={winningRate} length={length} />
          {status === gameState.end ? <GameSlider /> : null}
          {status === gameState.live ? (
            <TeamStatsLive
              Participants={liveData.match_data[length].player_data}
            />
          ) : status === gameState.end ? (
            <TeamStatsLive Participants={endData[length].player_data} />
          ) : (
            <TeamStats
              redTeam={gameData[0].team_avg_data}
              blueTeam={gameData[1].team_avg_data}
            />
          )}
          {status === gameState.live ? (
            <TeamInfoLive
              Participants={liveData.match_data[length].player_data}
            />
          ) : status === gameState.end ? (
            <TeamInfoLive Participants={endData[length].player_data} />
          ) : (
            <TeamInfo
              redWin={gameData[0].win}
              blueWin={gameData[1].win}
              redParticipants={gameData[0].participants}
              blueParticipants={gameData[1].participants}
            />
          )}
        </GameAnalysisWrapper>
      )}
    </GameAnalysisContainer>
  );
};
