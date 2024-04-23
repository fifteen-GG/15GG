import {
  TeamInfoContainer,
  TeamInfoWrapper,
  TeamNameWrapper,
  TeamInfoHeader,
  TeamName,
  UserInfoColumnWrapper,
  UserInfoColumn,
  SummonerList,
} from '../styles/teamInfo.s';
import { useEffect, useState } from 'react';
import LiveSummoner from './LiveSummoner';
import type { socketDetail, item } from '../../types/matchDetails';

interface propsType {
  Participants: {
    summonerName: string;
    championName: string;
    isDead: boolean;
    level: number;
    items: item[];
    team: string;
    kills: number;
    deaths: number;
    assists: number;
    gold: number;
  }[];
  blueWin: boolean;
  redWin: boolean;
}
const TeamInfoEnd = (props: propsType) => {
  const [teamData, setTeamData] = useState([
    {
      team: 'BLUE TEAM',
      win: props.blueWin,
      participants: [
        props.Participants[0],
        props.Participants[1],
        props.Participants[2],
        props.Participants[3],
        props.Participants[4],
      ],
    },
    {
      team: 'RED TEAM',
      win: props.redWin,
      participants: [
        props.Participants[5],
        props.Participants[6],
        props.Participants[7],
        props.Participants[8],
        props.Participants[9],
      ],
    },
  ]);

  const fetchPropsData = () => {
    setTeamData([
      {
        team: 'BLUE TEAM',
        win: props.blueWin,
        participants: [
          props.Participants[0],
          props.Participants[1],
          props.Participants[2],
          props.Participants[3],
          props.Participants[4],
        ],
      },
      {
        team: 'RED TEAM',
        win: props.redWin,
        participants: [
          props.Participants[5],
          props.Participants[6],
          props.Participants[7],
          props.Participants[8],
          props.Participants[9],
        ],
      },
    ]);
  };
  useEffect(() => {
    fetchPropsData();
  }, [, props.Participants]);
  return (
    <TeamInfoContainer>
      {teamData?.map((data, index) => {
        return (
          <TeamInfoWrapper key={data.team}>
            <TeamInfoHeader>
              <TeamNameWrapper>
                <TeamName team={index}>{data.team}</TeamName>
                {data.win ? (
                  <TeamName team={index}>WIN</TeamName>
                ) : (
                  <TeamName team={index}>LOSE</TeamName>
                )}
              </TeamNameWrapper>
              <UserInfoColumnWrapper>
                <UserInfoColumn>SUMMONER</UserInfoColumn>
                <UserInfoColumn>ITEMS</UserInfoColumn>
              </UserInfoColumnWrapper>
            </TeamInfoHeader>
            <SummonerList>
              {data.participants?.map((summoner, index) => {
                return (
                  <LiveSummoner
                    key={index}
                    livesummonerInfo={data.participants[index]}
                  />
                );
              })}
            </SummonerList>
          </TeamInfoWrapper>
        );
      })}
    </TeamInfoContainer>
  );
};

export default TeamInfoEnd;
