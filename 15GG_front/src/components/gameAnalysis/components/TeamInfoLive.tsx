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
import LiveSummoner from './LiveSummoner';
import type { socketDetail } from '../../types/matchDetails';

interface propsType {
  Participants: [
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
  ];
}
const TeamInfoLive = (props: propsType) => {
  const [teamData, setTeamData] = useState([
    {
      team: 'RED TEAM',
      participants: [
        props.Participants[0],
        props.Participants[1],
        props.Participants[2],
        props.Participants[3],
        props.Participants[4],
      ],
    },
    {
      team: 'BLUE TEAM',
      participants: [
        props.Participants[5],
        props.Participants[6],
        props.Participants[7],
        props.Participants[8],
        props.Participants[9],
      ],
    },
  ]);
  console.log(teamData);
  const fetchPropsData = () => {
    setTeamData([
      {
        team: 'RED TEAM',
        participants: [
          props.Participants[0],
          props.Participants[1],
          props.Participants[2],
          props.Participants[3],
          props.Participants[4],
        ],
      },
      {
        team: 'BLUE TEAM',
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
    console.log(props.Participants);
    fetchPropsData();
  }, [, props.Participants]);
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

export default TeamInfoLive;
