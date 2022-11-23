import { userChampion } from '../../types/summonerInfo';
import {
  PreferChampionContainer,
  PreferChampionWrapper,
  PreferChampionText,
  ChampionInfoWrapper,
  ChampionInfo,
  ChampionAltInfo,
  ChampionInfoText,
  ChampionImg,
  ChampionInfoContent,
  ChampionInfoSubTitle,
  ChampionInfoTitle,
  PreferChampionMsg,
} from '../styles/preferChampion.s';

interface propsType {
  champions: userChampion;
}
const PreferChampion = (props: propsType) => {
  // const [userChampion, setUserChampion] = useState<userChampion>(
  //   formatChampionsInfo(props.summonerInfo),
  // );
  // console.log(userChampion);
  console.log(props.champions);
  return (
    <PreferChampionContainer>
      <PreferChampionWrapper>
        <PreferChampionText>선호 챔피언 TOP3</PreferChampionText>
        {props.champions[0]?.counts === 0 ? (
          <ChampionAltInfo>플레이 결과가 없어요 :(</ChampionAltInfo>
        ) : (
          <ChampionInfo>
            {props.champions &&
              props.champions?.map((champion, index: number) => {
                return (
                  <ChampionInfoWrapper key={index}>
                    <ChampionImg src={props.champions[index]?.champion_name} />
                    <ChampionInfoText>
                      <ChampionInfoTitle>
                        {props.champions[index]?.counts}
                        게임
                      </ChampionInfoTitle>
                      <ChampionInfoContent
                        counts={props.champions[index]?.counts}
                      >
                        {props.champions[index]?.win_rate}
                      </ChampionInfoContent>
                      <ChampionInfoSubTitle
                        counts={props.champions[index]?.counts}
                      >
                        KDA {props.champions[index]?.kda}:1
                      </ChampionInfoSubTitle>
                    </ChampionInfoText>
                  </ChampionInfoWrapper>
                );
              })}
          </ChampionInfo>
        )}
      </PreferChampionWrapper>
      <PreferChampionMsg>
        최근 20게임을 바탕으로 분석한 결과이며, 데이터 평균에 따라 달라질 수
        있습니다.
      </PreferChampionMsg>
    </PreferChampionContainer>
  );
};
export default PreferChampion;
