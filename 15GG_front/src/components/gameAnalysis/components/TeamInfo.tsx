import {
  TeamInfoContainer,
  TeamInfoWrapper,
  TeamInfoHeader,
  TeamName,
  UserInfoColumnWrapper,
  UserInfoColumn,
  SummonerList,
} from '../styles/teamInfo.s';
import { useEffect, useState } from 'react';
import Summoner from './Summoner';
import type { summonerDetail } from '../../types/matchDetails';

interface propsType {
  redParticipants: [
    summonerDetail,
    summonerDetail,
    summonerDetail,
    summonerDetail,
    summonerDetail,
  ];
  blueParticipants: [
    summonerDetail,
    summonerDetail,
    summonerDetail,
    summonerDetail,
    summonerDetail,
  ];
}
const TeamInfo = (props: propsType) => {
  const [teamData, setTeamData] = useState([
    { team: 'RED TEAM', participants: props.redParticipants },
    { team: 'BLUE TEAM', participants: props.blueParticipants },
  ]);
  const fetchPropsData = () => {
    setTeamData([
      { team: 'RED TEAM', participants: props.redParticipants },
      { team: 'BLUE TEAM', participants: props.blueParticipants },
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
              <TeamName team={index}>{data.team}</TeamName>
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
