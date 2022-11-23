import styled from 'styled-components';
import BackgroundImage from '../../../assets/gg_bg_314.svg';
import LiveGameLabelImage from '../../../assets/gg_label_live.svg';
import * as Palette from '../../../assets/colorPalette';

export const LiveGameContainer = styled.div`
  width: 314px;
  height: 78px;
  border-radius: 8px;
  background-image: url(${BackgroundImage});
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0 0 0;
`;

export const TitleWrapper = styled.div`
  width: 314px;
  height: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const AnalysisTypeLabel = styled.div`
  width: 50px;
  height: 14px;
  margin: 0px 8px 0px 8px;
  background-image: url(${LiveGameLabelImage});
`;

export const GameTitle = styled.div`
  font-size: 10px;
  color: ${Palette.GG_WHITE_100};
  font-weight: 400;
`;

export const GameInfoWrapper = styled.div`
  width: 298px;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TeamWrapper = styled.div`
  height: 44px;
  display: flex;
`;

export const TeamsRow = styled.div`
  width: 65px;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
