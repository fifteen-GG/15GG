import { useNavigate } from 'react-router-dom';
import { MatchInfoType } from '../../types/matchInfo';
import {
  MatchCardContainer,
  MatchInfoWrapper,
  AnalysisStatus,
  MatchMainInfo,
  MatchResult,
  MatchData as MatchDate,
  MatchData as MatchMode,
  MatchData as MatchDuration,
  MatchDetailInfo,
  MatchCardContent,
  Profile,
  ImgWrapper as SpellWrapper,
  ImgWrapper as PerkWrapper,
  ImgBox as Spell,
  ImgBox as Perk,
  KDAWrapper,
  KDA,
  KDARate,
  CSNWardWrapper,
  CS,
  Ward,
  ItemWrapper,
  ItemImg,
  ItemBox,
} from '../styles/matchCard.s';
enum queue_mode {
  solo = '5v5 Ranked Solo games',
  blind = '5v5 Blind Pick games',
  aram = '5v5 ARAM games',
  flex = '5v5 Ranked Flex games',
  urf = 'Pick URF games',
}
export enum gameState {
  live = 'live',
  end = 'complete',
  none = 'incomplete',
}
interface propsType {
  matchInfo: MatchInfoType;
}
const MatchCard = (props: propsType) => {
  const navigate = useNavigate();
  const formatMatchInfo = (queMode: string) => {
    if (queMode === queue_mode.solo) {
      return '솔로랭크';
    } else if (queMode === queue_mode.flex) {
      return '자유랭크';
    } else if (queMode === queue_mode.blind) {
      return '일반게임';
    } else if (queMode === queue_mode.aram) {
      return '무작위 총력전';
    } else if (queMode === queue_mode.urf) {
      return 'U.R.F.';
    } else {
      return '사용자설정';
    }
  };

  const formatAnalysisStatus = (status: string) => {
    if (status === gameState.live) return '실시간 분석';
    else if (status === gameState.end) return '분석완료';
    else return '미분석';
  };
  ///status, win, reated_at, game_duration, queue_mode
  return (
    <MatchCardContainer
      onClick={() =>
        navigate(`/live?match%ID=${props.matchInfo.match_id}`, {
          state: {
            status: 'incomplete',
            mode: props.matchInfo.queue_mode,
            date: props.matchInfo.created_at,
          },
        })
      }
    >
      <AnalysisStatus status={props.matchInfo.status}>
        {formatAnalysisStatus(props.matchInfo.status)}
      </AnalysisStatus>
      <MatchInfoWrapper win={props.matchInfo.win}>
        <MatchMainInfo>
          <MatchResult>{props.matchInfo.win ? '승리' : '패배'}</MatchResult>
          <MatchDate>
            {props.matchInfo.created_at.replaceAll('-', '/').slice(2, 10)}
          </MatchDate>
          <MatchMode>{formatMatchInfo(props.matchInfo.queue_mode)}</MatchMode>
          <MatchDuration>
            {Math.round(props.matchInfo.game_duration / 60)}분{' '}
            {props.matchInfo.game_duration % 60}초
          </MatchDuration>
        </MatchMainInfo>
        <MatchDetailInfo>
          <MatchCardContent>
            <Profile
              src={
                process.env.REACT_APP_DDRAGON_API_ROOT +
                `/champion/${props.matchInfo.champion_name}.png`
              }
            />
            <SpellWrapper>
              <Spell
                src={
                  process.env.REACT_APP_DDRAGON_API_ROOT +
                  `/spell/${props.matchInfo.spells.spell1}.png`
                }
              />
              <Spell
                src={
                  process.env.REACT_APP_DDRAGON_API_ROOT +
                  `/spell/${props.matchInfo.spells.spell2}.png`
                }
              />
            </SpellWrapper>
            <PerkWrapper>
              <Perk
                src={
                  process.env.REACT_APP_OPGG_API_ROOT +
                  `/lol/perk/${props.matchInfo.perks.perk}.png`
                }
                style={{ borderRadius: '10px' }}
              />
              <Perk
                src={
                  process.env.REACT_APP_OPGG_API_ROOT +
                  `/lol/perkStyle/${props.matchInfo.perks.perk_style}.png`
                }
                style={{ borderRadius: '10px' }}
              />
            </PerkWrapper>
            <KDAWrapper>
              <KDA>
                {props.matchInfo.kills} / {props.matchInfo.deaths} /{' '}
                {props.matchInfo.assists}
              </KDA>
              <KDARate>KDA {props.matchInfo.kda}</KDARate>
            </KDAWrapper>
            <CSNWardWrapper>
              <CS>
                CS {props.matchInfo.cs} ({props.matchInfo.cs_per_min})
              </CS>
              <Ward>
                제어 와드 {props.matchInfo.vision_wards_bought_in_game}
              </Ward>
            </CSNWardWrapper>
          </MatchCardContent>
          <ItemWrapper>
            {props.matchInfo.items.map((item: number, index: number) => {
              return item === 0 ? (
                <ItemBox />
              ) : (
                <ItemImg
                  className={'item' + index}
                  src={
                    process.env.REACT_APP_DDRAGON_API_ROOT + `/item/${item}.png`
                  }
                  key={index}
                />
              );
            })}
          </ItemWrapper>
        </MatchDetailInfo>
      </MatchInfoWrapper>
    </MatchCardContainer>
  );
};
export default MatchCard;
