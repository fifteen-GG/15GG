import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { MatchInfoType } from '../types/matchInfo';
import type { SummonerInfoType } from '../types/summonerInfo';
import styled from 'styled-components';
import webClient from '../../WebClient';

//import components
import UserRank from './components/UserRank';
import UserGraph from './components/UserGraph';
import UserStatInfo from './components/UserStatInfo';
import MatchCard from './components/MatchCard';
import UserId from './components/UserId';
import PreferChampion from './components/PreferChampion';
import LoadingPage from './components/LoadingPage';
import ErrorPage from './components/ErrorPage';
import { userInfoFormat } from './userInfo';
import { MoreBox } from './styles/moreBox.s';

const UserInfoContainer = styled.div`
  width: 100%;
  @media screen and (max-width: 360px) {
    width: 328px;
  }
`;
const Loader = styled.div`
  color: white;
  text-align: center;
  font-size: 14px;
  margin-top: 4px;
  white-space: pre-line;
`;

export const UserInfo = () => {
  const [gamesData, setGamesData] = useState<MatchInfoType[]>([]);
  const [summonerInfo, setSummonerInfo] = useState<SummonerInfoType>({
    prefer_position: {
      '-': 0,
    },
    champions: [
      {
        champion_name: '',
        counts: 0,
        win_rate: 0,
        kda: 0,
      },
      {
        champion_name: '',
        counts: 0,
        win_rate: 0,
        kda: 0,
      },
      {
        champion_name: '',
        counts: 0,
        win_rate: 0,
        kda: 0,
      },
    ],
  } as SummonerInfoType); /*저번 회의때 얘기했던 부분이 여기 초기화를 해두고 champions를 앞에서부터 한개씩 갈아끼우는 느낌으로*/

  const [pageNum, setPageNum] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpUserStatusCode, setHttpUserStatusCode] = useState<number>(200);
  const [httpMatchStatusCode, setHttpMatchStatusCode] = useState<number>(200);
  // const [loader, setLoader] = useState<string>('데이터 불러오는 중...');
  const [loader, setLoader] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>('더보기');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('ID');
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    await getMatchData();
    setTimeout(() => {
      getUserData();
    }, 1000);
  };
  const getUserData = async () => {
    setIsLoading(true);
    try {
      const value = await webClient.get(`/riot/user/${id}`);
      if (value.status === 200) {
        setSummonerInfo(userInfoFormat(value.data));
      }
      if (value.data) setIsLoading(false);
    } catch (e: any) {
      setHttpUserStatusCode(e.response.status);
    }
  };
  const getMatchData = async () => {
    try {
      setLoadingMessage('데이터 로드 중...');
      const match = await webClient.get(
        `/riot/user/match_list/${id}?page=${pageNum}`,
      );

      const fetchedGames: MatchInfoType[] = [...gamesData, ...match.data];
      setTimeout(() => {
        setGamesData(fetchedGames);
        setPageNum(pageNum + 1);
        if (match.data.length < 3) {
          setHasMore(false);
        }
        setLoadingMessage('더보기');
      }, 1500);
    } catch (e: any) {
      // setLoader(
      //   '과도한 요청으로 데이터 로드가 제한됩니다. 잠시후 다시 시도해주세요.',
      // );
      setLoader(false);
    }
  };
  const pageReLoad = () => {
    webClient.get(`/riot/update/cache/${id}`).then(response => {
      if (response.data === 'Updated')
        window.location.replace(`/user?ID=${id}`);
    });
    // window.location.replace(`/user?ID=${id}`);
  };
  if (httpUserStatusCode === 404) return <ErrorPage />;
  // else if (httpStatusCode !== 200 && isLoading) return <ErrorPage />;
  return (
    <UserInfoContainer>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <UserId
            pageReLoad={pageReLoad}
            summonerName={id}
            profileIcon={summonerInfo.profile_icon_id}
            userName={summonerInfo.name}
            level={summonerInfo.level}
          />
          <UserRank
            userName={summonerInfo.name}
            soloRank={summonerInfo.soloRank}
            flexRank={summonerInfo.flexRank}
          />
          <UserStatInfo
            userName={summonerInfo.name}
            win_rate={summonerInfo.soloRank?.win_rate}
            wins={summonerInfo.soloRank?.wins}
            losses={summonerInfo.soloRank?.losses}
            kda_avg={summonerInfo.kda_avg}
            kills_avg={summonerInfo.kills_avg}
            deaths_avg={summonerInfo.deaths_avg}
            assists_avg={summonerInfo.assists_avg}
            prefer_position={summonerInfo.prefer_position}
            // position_rate={summonerInfo.position_rate}
          />
          <UserGraph userName={summonerInfo.name} />
          <PreferChampion champions={summonerInfo.champions} />
          {/* <InfiniteScroll
            next={getMatchData}
            dataLength={gamesData.length}
            hasMore={hasMore}
            loader={<Loader>{loader}</Loader>}
          > */}
          {gamesData.map((game: MatchInfoType, index) => {
            return <MatchCard matchInfo={game} key={index}></MatchCard>;
          })}
          {hasMore ? (
            loader ? (
              <MoreBox onClick={getMatchData}>{loadingMessage}</MoreBox>
            ) : (
              <Loader>
                과도한 요청으로 데이터 로드가 제한됩니다. 잠시후 다시
                시도해주세요
              </Loader>
            )
          ) : (
            <MoreBox>플레이한 게임이 존재하지 않습니다.</MoreBox>
          )}
          {/* </InfiniteScroll> */}
        </>
      )}
    </UserInfoContainer>
  );
};
