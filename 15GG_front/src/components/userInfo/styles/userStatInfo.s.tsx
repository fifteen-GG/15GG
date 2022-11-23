import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';

//UserStatInfo부분 스타일
export const UserStatInfoContainer = styled.div`
  width: 100%;
  height: 56px;
  margin-bottom: 8px;
  background-color: ${Palette.GG_BLACK_70};
  border-radius: 6px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const GraphImg = styled.div`
  display: flex;
  align-items: center;
  width: 36px;
  margin-left: 15px;
  position: relative;
`;
export const GraphText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8px;
  color: ${Palette.GG_WHITE_100};
`;
export const UserWinRateWrapper = styled.div`
  display: flex;
`;
export const UserInfoText = styled.div`
  width: 65px;
  margin: 0 10px 0 12px;
`;
export const UserInfoTitle = styled.div`
  font-size: 10px;
  color: ${Palette.GG_GREY_70};
`;
export const UserInfoContent = styled.div`
  font-size: 14px;
  color: ${Palette.GG_WHITE_100};
  font-weight: 700;
`;
export const UserInfoSubTitle = styled.div`
  font-size: 10px;
  color: ${Palette.GG_WHITE_100};
`;
