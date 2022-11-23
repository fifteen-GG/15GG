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
export const ChampionBox = styled.div`
  height: 22px;
  width: 22px;
  position: absolute;
  background-color: ${Palette.GG_BLACK_100};
  border-radius: 2px;
`;
export const ChampionImg = styled.img`
  height: 22px;
  width: 22px;
  position: absolute;
  background-color: ${Palette.GG_BLACK_100};
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

export const SummonerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 22px;
  justify-content: space-between;
`;
export const SummonerInfo = styled.div`
  display: flex;
  height: 11px;
  margin-left: 24px;
  align-items: center;
`;
export const SummonerName = styled.div`
  font-size: 11px;
  color: ${Palette.GG_WHITE_100};
  font-weight: bold;
  margin-right: 2px;
`;
export const KDAWrapper = styled.div`
  display: flex;
  height: 10px;
  margin-left: 24px;
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
  align-items: flex-start;
`;
export const GoldWrapper = styled.div`
  align-self: flex-end;
  font-size: 10px;
  font-weight: bold;
  color: ${Palette.GG_WHITE_100};
  margin-left: auto;
`;

export const ItemWrapper = styled.div`
  width: 117px;
  height: 15px;
  display: flex;
  &.item {
    position: absolute;
    align-items: flex-start
    z-index: 2;
  }
`;
export const ItemImg = styled.img`
  z-index: 2;
  height: 15px;
  width: 15px;
  margin-right: 2px;
  border-radius: 2px;
  &.item3340 {
    position: absolute;
    right: 0px;
    border-radius: 7px;
  }
  &.item3364 {
    position: absolute;
    right: 0px;
    border-radius: 7px;
  }
  &.item3363 {
    position: absolute;
    right: 0px;
    border-radius: 7px;
  }
  &.item3513 {
    position: absolute;
    right: 0px;
    border-radius: 7px;
  }
  &.item2052 {
    position: absolute;
    right: 0px;
    border-radius: 7px;
  }
`;
export const ItemBox = styled.div`
  z-index: 1;
  height: 15px;
  width: 15px;
  background: ${Palette.GG_BLACK_100};
  margin-right: 2px;
  border-radius: 2px;
  &.item6 {
    border-radius: 7px;
    order: 2;
  }
`;
