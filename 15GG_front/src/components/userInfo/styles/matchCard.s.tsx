import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';
import { gameState } from '../../types/enum';

export const MatchCardContainer = styled.div``;

export const MatchInfoWrapper = styled.div`
  height: 46px;
  background: ${(props: { win: boolean }) =>
    props.win ? Palette.GG_MATCHCARD_BLUE : Palette.GG_MATCHCARD_RED};
  border-radius: 10px;
  padding: 10px 10px 8px 14px;
`;

export const AnalysisStatus = styled.div`
  width: ${(props: { status: gameState }) =>
    props.status === gameState.live ? '50px' : '40px'};
  height: 14px;
  padding: 3px 5px;
  border-radius: 5px;
  background-color: ${(props: { status: gameState }) =>
    props.status === gameState.live
      ? Palette.GG_GREEN_LIVE
      : props.status === gameState.end
      ? Palette.GG_PURPLE
      : Palette.GG_BLACK_50_UNSELECTED};
  font-size: 8px;
  display: flex;
  position: relative;
  top: 8px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  color: ${Palette.GG_WHITE_100};
  font-weight: 700;
  line-height: 1;
`;

export const MatchMainInfo = styled.div`
  height: 10px;
  margin-bottom: 6px;
  color: ${Palette.GG_WHITE_100};
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  text-align: left;
  display: flex;
`;

export const MatchResult = styled.div`
  width: 18px;
  font-weight: 700;
  margin-right: 8px;
`;

export const MatchData = styled.div`
  margin-right: 6px;
`;

export const MatchDetailInfo = styled.div`
  height: 32px;
  display: flex;
  justify-content: space-between;
`;
export const MatchCardContent = styled.div`
  display: flex;
`;

export const Profile = styled.img`
  width: 32px;
  height: 100%;
  margin-right: 2px;
  border-radius: 10px;
  background: ${Palette.GG_BLACK_100};
`;

export const ImgWrapper = styled.div`
  display: flex;
  height: 32px;
  width: 15px;
  margin-right: 2px;
  flex-direction: column;
  justify-content: space-between;
`;
export const ImgBox = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 2px;
  background: ${Palette.GG_BLACK_100};
`;

export const KDAWrapper = styled.div`
  color: ${Palette.GG_WHITE_100};
  margin: 0px 22px 0px 2px;
`;

export const KDA = styled.div`
  height: 14px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 2px;
`;

export const KDARate = styled.div`
  height: 10px;
  font-size: 10px;
  font-weight: 500;
`;

export const CSNWardWrapper = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: ${Palette.GG_WHITE_100};
`;

export const CS = styled.div`
  height: 8px;
  margin-bottom: 7px;
`;

export const Ward = styled.div`
  height: 8px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 650px) {
    flex-wrap: wrap;
    width: 68px;
  }
`;

export const ItemImg = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 2px;
  onerror: none;
  margin-left: 2px;
  &.item0 {
    order: 0;
  }
  &.item1 {
    order: 1;
  }
  &.item2 {
    order: 2;
  }
  &.item3 {
    order: 4;
  }
  &.item4 {
    order: 5;
  }
  &.item5 {
    order: 5;
  }
  &.item6 {
    border-radius: 12px;
    order: 3;
  }
  @media screen and (min-width: 651px) {
    width: 24px;
    height: 24px;
    border-radius: 5px;
    &.item6 {
      order: 7;
    }
  }
`;
export const ItemBox = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 2px;
  background: ${Palette.GG_EMPTY_ITEM_BOX};
  onerror: none;
  margin-left: 2px;
  order: 6;
  @media screen and (min-width: 651px) {
    width: 24px;
    height: 24px;
    border-radius: 5px;
  }
`;
