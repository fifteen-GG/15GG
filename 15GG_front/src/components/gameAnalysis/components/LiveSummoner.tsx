import {
  SummonerContainer,
  IsDeadCover,
  SummonerInterface,
  ChampionBox,
  ChampionImg,
  ChampionLevel,
  SummonerInfoWrapper,
  SummonerInfo,
  SummonerName,
  KDAWrapper,
  KDADetails,
  KDA,
  ItemInterface,
  ItemBox,
  ItemImg,
  ItemWrapper,
  GoldWrapper,
} from '../styles/liveSummoners.s';
import type { socketDetail } from '../../types/matchDetails';
import axios from 'axios';
import { useEffect, useState } from 'react';
export interface propsType {
  livesummonerInfo: socketDetail;
}
const LiveSummoner = (props: propsType) => {
  const [championName, setChampionname] = useState(String);
  const formatSummonerName = (name: string) => {
    if (name.length > 8) return name.slice(0, 8) + '...';
    else return name;
  };
  const getChampionName = () => {
    axios
      .get(
        'https://ddragon.leagueoflegends.com/cdn/12.22.1/data/ko_KR/champion.json',
      )
      .then(res => {
        Object.entries(res.data.data).map((data: any) => {
          if (data[1].name === props.livesummonerInfo.championName) {
            setChampionname(data[0]);
          }
        });
      });
  };
  useEffect(() => {
    getChampionName();
  }, [props.livesummonerInfo.championName]);

  return (
    <SummonerContainer>
      {props.livesummonerInfo.isDead ? <IsDeadCover /> : null}
      <SummonerInterface>
        {props.livesummonerInfo.championName === '0' ? (
          <ChampionBox />
        ) : (
          <ChampionImg
            src={
              process.env.REACT_APP_DDRAGON_API_ROOT +
              `/champion/${championName}.png`
            }
          />
        )}
        <ChampionLevel>{props.livesummonerInfo.level}</ChampionLevel>
        {/* <SpellWrapper>
          <SpellImg
            src={
              process.env.REACT_APP_DDRAGON_API_ROOT +
              `/spell/${props.livesummonerInfo.spells.spell1}.png`
            }
          />
          <SpellImg
            src={
              process.env.REACT_APP_DDRAGON_API_ROOT +
              `/spell/${props.livesummonerInfo.spells.spell2}.png`
            }
          />
        </SpellWrapper>
        <PerksWrapper>
          <PerkImg
            src={
              process.env.REACT_APP_OPGG_API_ROOT +
              `/lol/perk/${props.livesummonerInfo.perks.perk}.png`
            }
          />
          <PerkImg
            src={
              process.env.REACT_APP_OPGG_API_ROOT +
              `/lol/perkStyle/${props.livesummonerInfo.perks.perkStyle}.png`
            }
          />
        </PerksWrapper> */}
        <SummonerInfoWrapper>
          <SummonerInfo>
            <SummonerName>
              {formatSummonerName(props.livesummonerInfo.summonerName)}
            </SummonerName>
            {/* {props.livesummonerInfo.rank === '' ? null : (
              <SummonerTier rank={props.livesummonerInfo.rank}>
                {props.livesummonerInfo.rank}
              </SummonerTier>
            )} */}
          </SummonerInfo>
          <KDAWrapper>
            <KDADetails>
              {`${props.livesummonerInfo.kills}  /  ${props.livesummonerInfo.deaths}  /  ${props.livesummonerInfo.assists} `}
            </KDADetails>
            <KDA>
              KDA{' '}
              {props.livesummonerInfo.deaths === 0 &&
              props.livesummonerInfo.kills === 0 &&
              props.livesummonerInfo.assists === 0
                ? '0.0'
                : props.livesummonerInfo.deaths === 0
                ? 'Perfect'
                : (
                    (props.livesummonerInfo.kills +
                      props.livesummonerInfo.assists) /
                    props.livesummonerInfo.deaths
                  ).toFixed(1)}
            </KDA>
          </KDAWrapper>
        </SummonerInfoWrapper>
      </SummonerInterface>
      <ItemInterface>
        <ItemWrapper>
          {[...Array(7)].map((item, index) => {
            return <ItemBox className={'item' + index} key={index} />;
          })}
        </ItemWrapper>
        <ItemWrapper className={'item'}>
          {props.livesummonerInfo.items.map((item, index) => {
            return (
              <ItemImg
                className={'item' + props.livesummonerInfo.items[index].itemID}
                src={
                  process.env.REACT_APP_DDRAGON_API_ROOT +
                  `/item/${props.livesummonerInfo.items[index].itemID}.png`
                }
                key={index}
              />
            );
          })}
        </ItemWrapper>
        {/* props.summonerInfo.totalDamageDealtToChampions > 1000
          ? `${
              (props.summonerInfo.totalDamageDealtToChampions / 1000).toString()
                .toLocaleString
            }`
          :  */}
        {/* {props.summonerInfo.totalDamageDealtToChampions.toLocaleString()} ·{' '} */}
        <GoldWrapper>
          {(props.livesummonerInfo.gold / 1000).toFixed(1)}K
        </GoldWrapper>
      </ItemInterface>
    </SummonerContainer>
  );
};

export default LiveSummoner;
