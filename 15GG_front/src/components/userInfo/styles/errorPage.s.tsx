import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';

export const ErrorContainer = styled.div``;

export const SummonerWrapper = styled.div`
  width: 100%;
  height: 76px;
  margin: 0 auto;
  display: flex;
`;

export const SummonerIcon = styled.div`
  width: 52px;
  height: 52px;
  background: ${Palette.GG_BLACK_70};
  margin: 2px 6px 6px 2px;
  border-radius: 10px;
  display: flex;
`;
export const SummonerNameWrapper = styled.div`
  flex-direction: column;
`;
export const SummonerName = styled.div`
  font-weight: 700;
  font-size: 28px;
  color: ${Palette.GG_WHITE_100};
`;

export const SummonerLevel = styled.div`
  font-weight: 500;
  font-size: 14px;
  margin: 0 0 11px 0;
  color: ${Palette.GG_GREY_70};
`;
export const ErrorTextWrapper = styled.div`
  width: 100%;
  height: 208px;
`;
export const ErrorImg = styled.img`
  width: 60px;
  height: 60px;
  margin: auto;
  display: block;
  margin-top: 54px;
  margin-bottom: 14px;
`;

export const ErrorText = styled.div`
  font-size: 14px;
  width: 158px;
  height: 34px;
  font-weight: 700;
  text-align: center;
  line-height: 1.2;
  margin: 0 auto;
  color: ${Palette.GG_WHITE_100};
`;
