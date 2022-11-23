import gg_error_bg from '.././../../assets/gg_error_bg.png';
import {
  EmptyCoverContainer,
  ErrorImg,
  InformationMsg,
} from '../styles/emptyCover.s';

const EmptyCover = () => {
  return (
    <EmptyCoverContainer>
      <ErrorImg src={gg_error_bg} />
      <InformationMsg>
        실시간 승률 분석은 랭크게임을 이용해주세요.
      </InformationMsg>
    </EmptyCoverContainer>
  );
};

export default EmptyCover;
