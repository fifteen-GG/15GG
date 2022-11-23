import {
  SummonerContainer,
  SummonerInterface,
  ChampionImg,
  ChampionLevel,
  SpellWrapper,
  PerksWrapper,
  ImgBox as SpellImg,
  ImgBox as PerkImg,
  SummonerInfoWrapper,
  SummonerInfo,
  SummonerName,
  SummonerTier,
  KDAWrapper,
  KDADetails,
  KDA,
  ItemInterface,
  ItemBox,
  ItemImg,
  ItemWrapper,
} from '../styles/summoners.s';
import type { summonerDetail } from '../../types/matchDetails';
export interface propsType {
  summonerInfo: summonerDetail;
}
const Summoner = (props: propsType) => {
  const formatSummonerName = (name: string) => {
    if (name.length > 8) return name.slice(0, 8) + '...';
    else return name;
  };
  return (
    <SummonerContainer>
      <SummonerInterface>
        <ChampionImg
          src={
            process.env.REACT_APP_DDRAGON_API_ROOT +
            `/champion/${props.summonerInfo.champion_name}.png`
          }
        />
        <ChampionLevel>{props.summonerInfo.champ_level}</ChampionLevel>
        <SpellWrapper>
          <SpellImg
            src={
              process.env.REACT_APP_DDRAGON_API_ROOT +
              `/spell/${props.summonerInfo.spells.spell1}.png`
            }
          />
          <SpellImg
            src={
              process.env.REACT_APP_DDRAGON_API_ROOT +
              `/spell/${props.summonerInfo.spells.spell2}.png`
            }
          />
        </SpellWrapper>
        <PerksWrapper>
          <PerkImg
            src={
              process.env.REACT_APP_OPGG_API_ROOT +
              `/lol/perk/${props.summonerInfo.perks.perk}.png`
            }
          />
          <PerkImg
            src={
              process.env.REACT_APP_OPGG_API_ROOT +
              `/lol/perkStyle/${props.summonerInfo.perks.perkStyle}.png`
            }
          />
        </PerksWrapper>
        <SummonerInfoWrapper>
          <SummonerInfo>
            <SummonerName>
              {formatSummonerName(props.summonerInfo.summoner_name)}
            </SummonerName>
            {props.summonerInfo.rank === '' ? null : (
              <SummonerTier rank={props.summonerInfo.rank}>
                {props.summonerInfo.rank.slice(0, 1).toUpperCase()}
              </SummonerTier>
            )}
          </SummonerInfo>
          <KDAWrapper>
            <KDADetails>
              {`${props.summonerInfo.kills}  /  ${props.summonerInfo.deaths}  /  ${props.summonerInfo.assists} `}
            </KDADetails>
            <KDA>
              KDA{' '}
              {(
                (props.summonerInfo.kills + props.summonerInfo.assists) /
                props.summonerInfo.deaths
              ).toFixed(1)}
            </KDA>
          </KDAWrapper>
        </SummonerInfoWrapper>
      </SummonerInterface>
      <ItemInterface>
        <ItemWrapper>
          {props.summonerInfo.items.map((item: number, index) => {
            return item === 0 ? (
              <ItemBox />
            ) : (
              <ItemImg
                className={'item' + index}
                src={
                  process.env.REACT_APP_DDRAGON_API_ROOT + `/item/${item}.png`
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
        {props.summonerInfo.total_damage_dealt_to_champions.toLocaleString()} ·{' '}
        {parseInt((props.summonerInfo.gold_earned / 1000).toString())}K
      </ItemInterface>
    </SummonerContainer>
  );
};

export default Summoner;
