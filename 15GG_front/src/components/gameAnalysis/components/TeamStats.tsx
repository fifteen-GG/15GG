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
import { pngType } from '../styles/teamStats.s';
interface propsType {
  redTeam: teamAvgData;
  blueTeam: teamAvgData;
}
const TeamStats = (props: propsType) => {
  const [teamStatsData, useTeamStatsData] = useState([
    { team: 'Red', avgStat: props.redTeam },
    { team: 'Blue', avgStat: props.blueTeam },
  ]);
  console.log(teamStatsData);
  const FetchData = () => {
    useTeamStatsData([
      { team: 'Red', avgStat: props.redTeam },
      { team: 'Blue', avgStat: props.blueTeam },
    ]);
  };
  useEffect(() => {
    FetchData();
  }, [props]);

  return (
    <TeamStatsContainer>
      {teamStatsData.map(data => {
        return (
          <TeamStatWrapper key={data.team}>
            <TeamGold team={data.team}>
              <Icon team={('gold' + data.team) as pngType} />
              <StatValue>
                {data.avgStat
                  ? (data.avgStat.golds / 1000).toFixed(1) + 'k'
                  : ''}
              </StatValue>
            </TeamGold>
            <TeamLevel team={data.team}>
              <Icon
                team={('level' + data.team) as pngType}
                style={{ width: '25px' }}
              />
              <StatValue>{data.avgStat ? data.avgStat.level : ''}</StatValue>
            </TeamLevel>
            <TeamKills team={data.team}>
              <Icon team={('kill' + data.team) as pngType} />
              <StatValue>{data.avgStat ? data.avgStat.kills : ''}</StatValue>
            </TeamKills>
          </TeamStatWrapper>
        );
      })}
    </TeamStatsContainer>
  );
};

export default TeamStats;
