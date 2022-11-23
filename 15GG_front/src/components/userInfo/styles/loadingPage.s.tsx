import styled, { keyframes } from 'styled-components';
import * as Palette from '../../../assets/colorPalette';
const pulse = keyframes`
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.6;
  }

  100% {
    opacity: 1.0;
  }
`;

export const LoadingPageContainer = styled.div``;

export const SkeletonWrapper = styled.div`
  height: 76px;
  margin: 0 auto;
  display: flex;
`;

export const SkeletonIcon = styled.div`
  width: 52px;
  height: 52px;
  background: ${Palette.GG_WHITE_100 + '14'};
  margin: 2px 8px 6px 2px;
  border-radius: 10px;
  animation: ${pulse} 2s infinite ease-in-out;
`;
export const SkeletonNameWrapper = styled.div`
  flex-direction: column;
`;
export const SkeletonName = styled.div`
  width: 108px;
  height: 24px;
  background: ${Palette.GG_WHITE_100 + '29'};
  margin: 2px 0px 8px 0px;
  border-radius: 50px;
  animation: ${pulse} 2s infinite ease-in-out;
  overflow: hidden;
`;

export const SkeletonLevel = styled.div`
  width: 57px;
  height: 16px;
  background: ${Palette.GG_WHITE_100 + '0D'};
  border-radius: 8px;
  animation: ${pulse} 2s infinite ease-in-out;
  overflow: hidden;
`;

export const LottieWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto;
  margin-top: 54px;
  margin-bottom: 14px;
`;
