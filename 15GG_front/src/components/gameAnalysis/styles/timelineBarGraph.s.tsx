import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';

export const TimelineBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 29px;
  width: 100%;
  margin-bottom: 12px;
`;
export const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 4px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
export const RateWrapper = styled.div`
  display: flex;
  height: 12px;
  justify-content: space-between;
`;
export const WinningRate = styled.div`
  font-size: 12px;
  color: ${Palette.GG_WHITE_100};
`;
export const GraphTitle = styled.div`
  font-size: 12px;
  color: ${Palette.GG_GRFTITLE};
`;
