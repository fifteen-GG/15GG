import {
  GameInfoContainer,
  HeaderWrapper,
  GameType,
  AnalysisInfo,
  DateInfo,
} from '../styles/gameInfo.s';
import { gameState, queue_mode } from '../../types/enum';

interface propsType {
  status: gameState;
  mode: queue_mode;
  date: string;
}

const GameInfo = (props: propsType) => {
  const formatMatchInfo = (queueMode: string) => {
    if (queueMode === queue_mode.solo) {
      return '솔로랭크';
    } else if (queueMode === queue_mode.flex) {
      return '자유랭크';
    } else if (queueMode === queue_mode.blind) {
      return '일반게임';
    } else if (queueMode === queue_mode.aram) {
      return '칼바람나락';
    } else if (queueMode === queue_mode.urf) {
      return 'U.R.F.';
    } else {
      return '사용자설정';
    }
  };
  const formatAnalysisStatus = (status: string) => {
    if (status === gameState.live) return '실시간';
    else if (status === gameState.end) return '분석완료';
    else return '미분석';
  };
  const formatMatchDate = (date: string) => {
    return (
      date.slice(0, 4) +
      '년' +
      ' ' +
      date.slice(5, 7) +
      '월' +
      ' ' +
      date.slice(8, 10) +
      '일'
    );
  };

  return (
    <GameInfoContainer>
      <HeaderWrapper>
        <GameType>{formatMatchInfo(props.mode)}</GameType>
        <AnalysisInfo status={props.status}>
          {formatAnalysisStatus(props.status)}
        </AnalysisInfo>
      </HeaderWrapper>
      <DateInfo>{formatMatchDate(props.date)}</DateInfo>
    </GameInfoContainer>
  );
};

export default GameInfo;
