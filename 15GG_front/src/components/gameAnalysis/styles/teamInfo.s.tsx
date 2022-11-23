import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';

enum TeamNameEnum {
  RED,
  BLUE,
}
interface TeamStatProps {
  team: TeamNameEnum;
}
export const TeamInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const TeamInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 234px;
  margin-bottom: 12px;
`;
export const TeamInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  height: 44px;
`;
export const TeamName = styled.div<TeamStatProps>`
  display: flex;
  background-color: ${Palette.GG_BLACK_70};
  height: 28px;
  border-radius: 4px 4px 0 0;
  padding-left: 8px;
  color: ${props =>
    props.team === TeamNameEnum.RED ? Palette.GG_RED : Palette.GG_BLUE};
  font-size: 12px;
  font-weight: 500;
  align-items: center;
`;
export const UserInfoColumnWrapper = styled.div`
  display: flex;
  padding: 0 8px 0 8px;
  height: 16px;
  align-items: center;
  justify-content: space-between;
`;
export const UserInfoColumn = styled.div`
  font-size: 9px;
  color: ${Palette.GG_WHITE_100};
  font-weight: 700;
`;
export const SummonerList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Palette.GG_BLACK_70};
  border-radius: 0 0 4px 4px;
`;
export { TeamNameEnum as Team };
