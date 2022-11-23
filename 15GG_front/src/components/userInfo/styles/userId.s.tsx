import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';

//UserId 부분 스타일
export const UserIdContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  margin-bottom: 4px;
`;
export const UserIcon = styled.img`
  width: 52px;
  height: 52px;
  margin: 2px 6px 6px 2px;
  border-radius: 10px;
  display: flex;
`;
export const UserInfoWrapper = styled.div`
  flex-direction: column;
`;
export const UserName = styled.div`
  font-weight: 700;
  font-size: 28px;
  color: ${Palette.GG_WHITE_100};
`;
export const UserLevelWrapper = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 14px;
  margin: 0 0 11px 0;
  color: ${Palette.GG_GREY_70};
`;
export const Level = styled.div``;
export const PageReLoad = styled.div`
  text-decoration: underline;
  cursor: pointer;
  :hover {
    color: ${Palette.GG_WHITE_100};
  }
`;
