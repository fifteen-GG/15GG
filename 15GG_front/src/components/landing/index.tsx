import { useNavigate } from 'react-router-dom';
import { SearchBox } from './components/SearchBox';
import { LiveGame } from './components/LiveGame';
import styled from 'styled-components';
import logo from '../../assets/gg_logo_temp.svg';
import bgVideo from '../../assets/gg_bg_worlds_22.mp4';
import * as Palette from '../../assets/colorPalette';

const LandingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-size: cover;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120vh;
  object-fit: cover;
  z-index: -1;
`;

const LandingWrapper = styled.div`
  position: absolute;
  width: 314px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 64px;
`;
const Logo = styled.img`
  margin-top: 180px;
  margin-bottom: 38px;
  width: 150px;
  height: 45px;
  background-position: center;
  object-fit: contain;
`;
//로고는 임시

const GamesWrapper = styled.div`
  width: 314px;
`;

const GamesTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const GamesTitle = styled.div`
  color: ${Palette.GG_WHITE_100};
  font-size: 16;
  font-weight: 500;
`;

const CodeButton = styled.div`
  width: 60px;
  height: 22px;
  background-color: ${Palette.GG_PURPLE};
  border-radius: 8px;
  display: flex;
  color: ${Palette.GG_WHITE_100};
  font-size: 8pt;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Landing = () => {
  const matchId = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  return (
    <LandingContainer>
      <BackgroundVideo src={bgVideo} loop autoPlay muted />
      <LandingWrapper>
        <TitleWrapper>
          <Logo src={logo} onClick={() => navigate('/')} />
          <SearchBox />
        </TitleWrapper>
        <GamesWrapper>
          <GamesTitleWrapper>
            <GamesTitle>실시간 분석 중</GamesTitle>
            <CodeButton onClick={() => navigate('/code')}>코드 생성</CodeButton>
          </GamesTitleWrapper>
          {matchId.map((data, index) => {
            return <LiveGame key={data} />;
          })}
        </GamesWrapper>
      </LandingWrapper>
    </LandingContainer>
  );
};
