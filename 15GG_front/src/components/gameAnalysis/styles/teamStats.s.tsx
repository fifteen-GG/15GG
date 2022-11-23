import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';

import goldRed from '../svg/gold_red.svg';
import killRed from '../svg/kills_red.svg';
import levelRed from '../svg/level_red.svg';
import goldBlue from '../svg/gold_blue.svg';
import killBlue from '../svg/kills_blue.svg';
import levelBlue from '../svg/level_blue.svg';
import { deflate } from 'zlib';

export const TeamStatsContainer = styled.div`
  display: flex;
  height: 64px;
  width: 100%;
  border-top: 2px solid ${Palette.GG_STATS_BORDER};
`;

enum TeamNameEnum {
  RED = 'Red',
  BLUE = 'Blue',
}
export const TeamStatWrapper = styled.div`
  display: flex;
  width: calc(50% - 1px);
  height: 48px;
  justify-content: space-evenly;
  align-items: flex-end;
  :nth-child(1) {
    border-right: 2px solid ${Palette.GG_STATS_BORDER};
  }
`;
export enum pngType {
  goldRed = 'goldRed',
  killRed = 'killRed',
  levelRed = 'levelRed',
  goldBlue = 'goldBlue',
  killBlue = 'killBlue',
  levelBlue = 'levelBlue',
}
const gg_svg: {
  [key in pngType]: string;
} = {
  goldRed: goldRed,
  killRed: killRed,
  levelRed: levelRed,
  goldBlue: goldBlue,
  killBlue: killBlue,
  levelBlue: levelBlue,
};

export const Icon = styled.div<{ team: pngType }>`
  width: 20px;
  height: 20px;
  background-image: ${props => `url(${gg_svg[props.team]})`};
  background-size: cover;
`;

export const Stat = styled.div<{ team: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 40px;
  color: ${props =>
    props.team === TeamNameEnum.RED ? Palette.GG_RED : Palette.GG_PURPLE};
`;
export const StatValue = styled.div`
  display: flex;
  color: ${Palette.GG_WHITE_100};
  font-size: 12px;
  font-weight: bold;
`;
export const LoadAlert = styled.div`
  position: absolute;
  color: ${Palette.GG_WHITE_100};
  font-size: 12px;
`;
