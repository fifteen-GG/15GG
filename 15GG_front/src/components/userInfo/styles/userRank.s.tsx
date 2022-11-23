import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';

//UserRank부분 스타일
export const UserRankContainer = styled.div`
  width: 100%;
  height: 96px;
  margin-bottom: 12px;
  display: flex;
  padding: 0px 2px 0 2px;
  box-sizing: border-box;
  justify-content: space-between;
`;
//클래스로 지정해도 되는지 width와 배치에 대한 포맷을 맞춰야 할듯
export const RankWrapper = styled.div`
  @media screen and (max-width: 360px) {
    width: 152px;
  }
  width: calc(50% - 1px);
  display: flex;
  &:nth-child(1) {
    border-right: 2px solid ${Palette.GG_BLACK_70};
    padding-right: 9px;
  }
  &.Flex {
    margin-left: 12px;
  }
  padding-top: 14px;
  margin-bottom: 8px;
  position: relative;
`;

export const RankText = styled.div`
  margin-right: 9px;
`;
export const RankSubTitle = styled.div`
  font-size: 12px;
  color: ${Palette.GG_GREY_70};
`;
export const RankName = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: ${Palette.GG_WHITE_100};
`;
export const RankContent = styled.div`
  font-size: 12px;
  margin: 10px 0px 8px 0;
  box-sizing: border-box;
  color: ${Palette.GG_WHITE_100};
`;
export const RankLp = styled.div``;
export const RankWinrate = styled.div``;
export const RankImg = styled.img`
  position: absolute;
  right: 0;
  @media screen and (max-width: 360px) {
    width: 56px;
    height: 56px;
  }
  transition: 0.5s;
  width: 64px;
  height: 64px;
  border-radius: 10px;
`;
