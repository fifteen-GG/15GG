import {
  TeamInfoContainer,
  TeamInfoWrapper,
  TeamInfoHeader,
  TeamNameWrapper,
  TeamName,
  UserInfoColumnWrapper,
  UserInfoColumn,
  SummonerList,
} from '../styles/teamInfo.s';
import { useEffect, useState } from 'react';
import Summoner from './Summoner';
import type { summonerDetail } from '../../types/matchDetails';

interface propsType {
  blueWin: boolean;
  blueParticipants: [
    summonerDetail,
    summonerDetail,
    summonerDetail,
    summonerDetail,
    summonerDetail,
  ];
  redWin: boolean;
  redParticipants: [
    summonerDetail,
    summonerDetail,
    summonerDetail,
    summonerDetail,
    summonerDetail,
  ];
}
const TeamInfo = (props: propsType) => {
  const [teamData, setTeamData] = useState([
    {
      team: 'BLUE TEAM',
      win: props.blueWin,
      participants: props.blueParticipants,
    },
    {
      team: 'RED TEAM',
      win: props.redWin,
      participants: props.redParticipants,
    },
  ]);
  const fetchPropsData = () => {
    setTeamData([
      {
        team: 'BLUE TEAM',
        win: props.blueWin,
        participants: props.blueParticipants,
      },
      {
        team: 'RED TEAM',
        win: props.redWin,
        participants: props.redParticipants,
      },
    ]);
  };
  console.log(teamData);
  useEffect(() => {
    if (teamData[0].participants === undefined) {
      fetchPropsData();
    }
  }, [props]);
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
              {data.participants?.map(summoner => {
                return (
                  <Summoner
                    key={summoner.summoner_name}
                    summonerInfo={summoner}
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

export default TeamInfo;
