import { useEffect, useState } from 'react';
import {
  TeamStatsContainer,
  TeamStatWrapper,
  Stat as TeamGold,
  Stat as TeamLevel,
  Stat as TeamKills,
  StatValue,
  Icon,
} from '../styles/teamStats.s';
import type { teamAvgData } from '../../types/matchDetails';
import type { socketDetail } from '../../types/matchDetails';
import { pngType } from '../styles/teamStats.s';
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
const TeamStatsLive = (props: propsType) => {
  const [teamStatsData, setTeamStatsData] = useState([
    {
      team: 'Red',
      avgGold:
        (props.Participants[0].gold +
          props.Participants[1].gold +
          props.Participants[2].gold +
          props.Participants[3].gold +
          props.Participants[4].gold) /
        5,
      avgLevel:
        (props.Participants[0].level +
          props.Participants[1].level +
          props.Participants[2].level +
          props.Participants[3].level +
          props.Participants[4].level) /
        5,
      avgKill:
        props.Participants[0].kills +
        props.Participants[1].kills +
        props.Participants[2].kills +
        props.Participants[3].kills +
        props.Participants[4].kills,
    },
    {
      team: 'Blue',
      avgGold:
        (props.Participants[5].gold +
          props.Participants[6].gold +
          props.Participants[7].gold +
          props.Participants[8].gold +
          props.Participants[9].gold) /
        5,
      avgLevel:
        (props.Participants[5].level +
          props.Participants[6].level +
          props.Participants[7].level +
          props.Participants[8].level +
          props.Participants[9].level) /
        5,
      avgKill:
        props.Participants[5].kills +
        props.Participants[6].kills +
        props.Participants[7].kills +
        props.Participants[8].kills +
        props.Participants[9].kills,
    },
  ]);
  console.log(teamStatsData);
  const FetchData = () => {
    setTeamStatsData([
      {
        team: 'Red',
        avgGold:
          (props.Participants[0].gold +
            props.Participants[1].gold +
            props.Participants[2].gold +
            props.Participants[3].gold +
            props.Participants[4].gold) /
          5,
        avgLevel:
          (props.Participants[0].level +
            props.Participants[1].level +
            props.Participants[2].level +
            props.Participants[3].level +
            props.Participants[4].level) /
          5,
        avgKill:
          props.Participants[0].kills +
          props.Participants[1].kills +
          props.Participants[2].kills +
          props.Participants[3].kills +
          props.Participants[4].kills,
      },
      {
        team: 'Blue',
        avgGold:
          (props.Participants[5].gold +
            props.Participants[6].gold +
            props.Participants[7].gold +
            props.Participants[8].gold +
            props.Participants[9].gold) /
          5,
        avgLevel:
          (props.Participants[5].level +
            props.Participants[6].level +
            props.Participants[7].level +
            props.Participants[8].level +
            props.Participants[9].level) /
          5,
        avgKill:
          props.Participants[5].kills +
          props.Participants[6].kills +
          props.Participants[7].kills +
          props.Participants[8].kills +
          props.Participants[9].kills,
      },
    ]);
  };
  useEffect(() => {
    FetchData();
  }, [, props.Participants]);

  return (
    <TeamStatsContainer>
      {teamStatsData.map(data => {
        return (
          <TeamStatWrapper key={data.team}>
            <TeamGold team={data.team}>
              <Icon team={('gold' + data.team) as pngType} />
              <StatValue>{(data.avgGold / 1000).toFixed(1) + 'k'}</StatValue>
            </TeamGold>
            <TeamLevel team={data.team}>
              <Icon
                team={('level' + data.team) as pngType}
                style={{ width: '25px' }}
              />
              <StatValue>{data.avgLevel.toFixed(1)}</StatValue>
            </TeamLevel>
            <TeamKills team={data.team}>
              <Icon team={('kill' + data.team) as pngType} />
              <StatValue>{data.avgKill}</StatValue>
            </TeamKills>
          </TeamStatWrapper>
        );
      })}
    </TeamStatsContainer>
  );
};

export default TeamStatsLive;
