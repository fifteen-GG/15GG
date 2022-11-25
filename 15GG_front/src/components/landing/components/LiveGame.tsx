import { useState, useEffect } from 'react';
import webClient from '../../../WebClient';
import {
  LiveGameContainer,
  TitleWrapper,
  GameTitle,
  AnalysisTypeLabel,
  GameInfoWrapper,
  TeamWrapper,
  TeamsRow as UpperLinePosition,
  TeamsRow as LowerLinePosition,
} from '../styles/livegame.s';
import { LiveUser } from './LiveUser';
interface propsType {
  gameData: gameInfo;
}
interface gameInfo {
  game_duration: number;
  queue_mode: string;
  status: number;
  id: string;
  created_at: string;
}
interface summonerData {
  summonerName: string;
  championName: string;
  individualPosition: string;
  teamPosition: string;
}
interface gameData {
  gameVersion: string;
  red: [summonerData, summonerData, summonerData, summonerData, summonerData];
  blue: [summonerData, summonerData, summonerData, summonerData, summonerData];
  gameCreation: string;
}
// /riot/match/preview/
export const LiveGame = (props: propsType) => {
  const [gameData, setGameData] = useState<gameData>();
  const getGameData = async () => {
    try {
      const data = await webClient.get(
        `/riot/match/preview/${props.gameData.id}`,
      );
      if (data.status === 200) {
        setGameData(data.data);
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (props.gameData.id !== undefined) getGameData();
    console.log(props.gameData.id);
    console.log(gameData);
  }, [props.gameData]);
  return (
    <LiveGameContainer>
      <TitleWrapper>
        <AnalysisTypeLabel />
        <GameTitle>
          {gameData?.gameCreation.slice(0, 10).replaceAll('-', ' / ')}
        </GameTitle>
      </TitleWrapper>
      <GameInfoWrapper>
        <TeamWrapper key={100}>
          <UpperLinePosition>
            {gameData?.red.slice(0, 3).map((data, index) => {
              return (
                <LiveUser
                  key={index}
                  row="left"
                  name={data.summonerName}
                  champion={data.championName}
                  pos={data.teamPosition}
                />
              );
            })}
          </UpperLinePosition>
          <LowerLinePosition>
            {gameData?.red.slice(3, 5).map((data, index) => {
              return (
                <LiveUser
                  key={index}
                  row="left"
                  name={data.summonerName}
                  champion={data.championName}
                  pos={data.teamPosition}
                />
              );
            })}
          </LowerLinePosition>
        </TeamWrapper>
        <TeamWrapper key={200}>
          <LowerLinePosition>
            {gameData?.blue.slice(0, 2).map((data, index) => {
              return (
                <LiveUser
                  key={index}
                  row="right"
                  name={data.summonerName}
                  champion={data.championName}
                  pos={data.teamPosition}
                />
              );
            })}
          </LowerLinePosition>
          <UpperLinePosition>
            {gameData?.blue.slice(2, 5).map((data, index) => {
              return (
                <LiveUser
                  key={index}
                  row="right"
                  name={data.summonerName}
                  champion={data.championName}
                  pos={data.teamPosition}
                />
              );
            })}
          </UpperLinePosition>
        </TeamWrapper>
      </GameInfoWrapper>
    </LiveGameContainer>
  );
};
