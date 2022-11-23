import { useState } from 'react';
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
interface userData {
  name: string;
  champion: string;
  position: string;
}
interface gameData {
  gameType: string;
  gameDate: string;
  redTeam: userData[];
  blueTeam: userData[];
}
export const LiveGame = () => {
  const [game, setGame] = useState<gameData>({
    gameType: '솔로랭크',
    gameDate: '07/08',
    redTeam: [
      { name: '정잭영...', champion: 'Aatrox', position: 'top' },
      { name: '정잭일...', champion: 'Trundle', position: 'jgl' },
      { name: '정잭이...', champion: 'Azir', position: 'mid' },
      { name: '정잭삼...', champion: 'Zeri', position: 'adc' },
      { name: '정잭사...', champion: 'Yuumi', position: 'sup' },
    ],
    blueTeam: [
      { name: '정잭오...', champion: 'Kalista', position: 'adc' },
      { name: '정잭육...', champion: 'Amumu', position: 'sup' },
      { name: '정잭칠...', champion: 'Sejuani', position: 'top' },
      { name: '정잭팔...', champion: 'Graves', position: 'jgl' },
      { name: '정잭구...', champion: 'Galio', position: 'mid' },
    ],
  });

  return (
    <LiveGameContainer>
      <TitleWrapper>
        <AnalysisTypeLabel />
        <GameTitle>
          {game.gameDate} · {game.gameType}
        </GameTitle>
      </TitleWrapper>
      <GameInfoWrapper>
        <TeamWrapper key={100}>
          <UpperLinePosition>
            {game.redTeam.slice(0, 3).map((data, index) => {
              return (
                <LiveUser
                  key={index}
                  row="left"
                  name={data.name}
                  champion={data.champion}
                  pos={data.position}
                />
              );
            })}
          </UpperLinePosition>
          <LowerLinePosition>
            {game.redTeam.slice(3, 5).map((data, index) => {
              return (
                <LiveUser
                  key={index}
                  row="left"
                  name={data.name}
                  champion={data.champion}
                  pos={data.position}
                />
              );
            })}
          </LowerLinePosition>
        </TeamWrapper>
        <TeamWrapper key={200}>
          <LowerLinePosition>
            {game.blueTeam.slice(0, 2).map((data, index) => {
              return (
                <LiveUser
                  key={index}
                  row="right"
                  name={data.name}
                  champion={data.champion}
                  pos={data.position}
                />
              );
            })}
          </LowerLinePosition>
          <UpperLinePosition>
            {game.blueTeam.slice(2, 5).map((data, index) => {
              return (
                <LiveUser
                  key={index}
                  row="right"
                  name={data.name}
                  champion={data.champion}
                  pos={data.position}
                />
              );
            })}
          </UpperLinePosition>
        </TeamWrapper>
      </GameInfoWrapper>
    </LiveGameContainer>
  );
};
