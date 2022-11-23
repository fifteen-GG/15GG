import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';

export const SummonerContainer = styled.div`
  display: flex;
  height: 38px;
  padding: 0px 4px 0px 8px;
  justify-content: space-between;
`;
export const SummonerInterface = styled.div`
  display: flex;
  height: 22px;
  margin-top: 7px;
`;
export const ChampionImg = styled.img`
  height: 22px;
  width: 22px;
  position: absolute;
  background-color: ${Palette.GG_WHITE_100};
  border-radius: 2px;
`;
export const ChampionLevel = styled.div`
  display: flex;
  height: 10px;
  width: 10px;
  background-color: ${Palette.GG_BLACK_100 + `CC`};
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  position: absolute;
  margin-left: 12px;
  margin-top: 12px;
  font-size: 6px;
  color: ${Palette.GG_WHITE_100};
  border-radius: 2px;
`;
export const SpellWrapper = styled.div`
  display: flex;
  height: 22px;
  width: 10px;
  margin-left: 24px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 2px;
`;

export const PerksWrapper = styled.div`
  display: flex;
  height: 22px;
  width: 10px;
  margin-left: 2px;
  margin-right: 3px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 2px;
`;

export const ImgBox = styled.img`
  height: 10px;
  width: 10px;
  border-radius: 2px;
`;

export const SummonerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 22px;
  justify-content: space-between;
`;
export const SummonerInfo = styled.div`
  display: flex;
  height: 11px;
  align-items: center;
`;
export const SummonerName = styled.div`
  font-size: 11px;
  color: ${Palette.GG_WHITE_100};
  font-weight: bold;
  margin-right: 2px;
`;
export const SummonerTier = styled.div`
  display: flex;
  background-color: ${(props: { rank: string }) =>
    props.rank.slice(0, 1).toUpperCase() === 'D'
      ? Palette.GG_DIAMOND
      : props.rank.slice(0, 1).toUpperCase() === 'P'
      ? Palette.GG_PLATINUM
      : props.rank.slice(0, 1).toUpperCase() === 'G'
      ? Palette.GG_GOLD
      : props.rank.slice(0, 1).toUpperCase() === 'S'
      ? Palette.GG_SILVER
      : props.rank.slice(0, 1).toUpperCase() === 'B'
      ? Palette.GG_BRONZE
      : props.rank.slice(0, 1).toUpperCase() === 'I'
      ? Palette.GG_SILVER
      : Palette.GG_PURPLE};
  height: 10px;
  width: 15px;
  color: ${Palette.GG_WHITE_100};
  font-size: 6px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
export const KDAWrapper = styled.div`
  display: flex;
  height: 10px;
`;
export const KDADetails = styled.div`
  display: flex;
  height: 10px;
  font-size: 10px;
  color: ${Palette.GG_WHITE_100};
  font-weight: bold;
  white-space: pre;
`;
export const KDA = styled.div`
  display: flex;
  font-size: 8px;
  font-weight: bold;
  color: ${Palette.GG_TURQ_KDA};
  line-height: 1.8;
`;
export const ItemInterface = styled.div`
  display: flex;
  flex-direction: column;
  width: 117px;
  height: 26px;
  margin-top: 6px;
  align-items: flex-end;
  font-size: 10px;
  font-weight: bold;
  color: ${Palette.GG_WHITE_100};
`;
export const ItemWrapper = styled.div`
  display: flex;
`;
export const ItemImg = styled.img`
  height: 15px;
  width: 15px;
  margin-right: 2px;
  border-radius: 2px;
  &.item6 {
    border-radius: 7px;
    order: 2;
  }
`;
export const ItemBox = styled.div`
  height: 15px;
  width: 15px;
  background: ${Palette.GG_BLACK_100};
  margin-right: 2px;
  border-radius: 2px;
  order: 1;
`;
