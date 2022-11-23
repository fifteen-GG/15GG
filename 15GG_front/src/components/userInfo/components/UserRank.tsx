import unrankedImg from '../../../assets/gg_tier_unranked_4x.png';
import {
  UserRankContainer,
  RankWrapper,
  RankText,
  RankSubTitle,
  RankName,
  RankContent,
  RankLp,
  RankWinrate,
  RankImg,
} from '../styles/userRank.s';
import { userRank } from '../../types/summonerInfo';
// import { formatRankInfo } from '../userInfoFunc';
// import { useState } from 'react';

interface propsType {
  userName: string;
  soloRank: userRank;
  flexRank: userRank;
}

const UserRank = (props: propsType) => {
  return (
    <UserRankContainer>
      <RankWrapper className="Solo">
        <RankText>
          <RankSubTitle>솔로랭크</RankSubTitle>
          <RankName>{props.soloRank?.name}</RankName>
          <RankContent>
            <RankLp>{props.soloRank?.lp}LP</RankLp>
            <RankWinrate>
              {props.soloRank?.win_rate}% ({props.soloRank?.wins}승{' '}
              {props.soloRank?.losses}패)
            </RankWinrate>
          </RankContent>
        </RankText>
        {props.soloRank?.name === 'Unranked' ? (
          <RankImg src={unrankedImg} />
        ) : (
          <RankImg
            src={
              process.env.REACT_APP_OPGG_API_ROOT +
              `/medals_new/${props.soloRank?.tier.toLowerCase()}.png`
            }
          />
        )}
      </RankWrapper>
      <RankWrapper className="Flex">
        <RankText>
          <RankSubTitle>자유랭크</RankSubTitle>
          <RankName>{props.flexRank?.name}</RankName>
          <RankContent>
            <RankLp>{props.flexRank?.lp}LP</RankLp>
            <RankWinrate>
              {props.flexRank?.win_rate}% ({props.flexRank?.wins}승{' '}
              {props.flexRank?.losses}패)
            </RankWinrate>
          </RankContent>
        </RankText>
        {props.flexRank?.name === 'Unranked' ? (
          <RankImg src={unrankedImg} />
        ) : (
          <RankImg
            src={
              process.env.REACT_APP_OPGG_API_ROOT +
              `/medals_new/${props.flexRank?.tier.toLowerCase()}.png`
            }
          />
        )}
      </RankWrapper>
    </UserRankContainer>
  );
};
export default UserRank;
