import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';

export const EmptyCoverContainer = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  position: absolute;
  z-index: 2;
  flex-direction: column;
  align-items: center;
  background-color: ${Palette.GG_BLACK_100 + `BF`};
  margin-top: 54px;
`;
export const ErrorImg = styled.img`
  width: 60px;
  height: 60px;
  margin-top: 54px;
  margin-bottom: 14px;
`;
export const InformationMsg = styled.div`
  font-size: 14px;
  color: ${Palette.GG_WHITE_100};
`;
