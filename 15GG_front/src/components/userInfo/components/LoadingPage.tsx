import Lottie from 'lottie-react';

import { lottieImg } from '../../../assets';
import {
  LoadingPageContainer,
  LottieWrapper,
  SkeletonWrapper,
  SkeletonIcon,
  SkeletonNameWrapper,
  SkeletonName,
  SkeletonLevel,
} from '../styles/loadingPage.s';

const LoadingPage = () => {
  return (
    <LoadingPageContainer>
      <SkeletonWrapper>
        <SkeletonIcon></SkeletonIcon>
        <SkeletonNameWrapper>
          <SkeletonName></SkeletonName>
          <SkeletonLevel></SkeletonLevel>
        </SkeletonNameWrapper>
      </SkeletonWrapper>
      <LottieWrapper>
        <Lottie animationData={lottieImg} />
      </LottieWrapper>
    </LoadingPageContainer>
  );
};

export default LoadingPage;
