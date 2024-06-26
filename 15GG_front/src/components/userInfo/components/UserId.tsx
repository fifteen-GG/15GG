import {
  UserIdContainer,
  UserIcon,
  UserInfoWrapper,
  UserName,
  UserLevelWrapper,
  Level,
  PageReLoad,
} from '../styles/userId.s';

interface propsType {
  pageReLoad: () => void;
  summonerName: string | null;
  profileIcon: string;
  userName: string;
  level: Number;
}
const UserId = (props: propsType) => {
  return (
    <UserIdContainer>
      <UserIcon
        src={
          process.env.REACT_APP_DDRAGON_API_ROOT +
          `/profileicon/${props.profileIcon}.png`
        }
      />
      <UserInfoWrapper>
        <UserName>{props.userName}</UserName>
        <UserLevelWrapper>
          <Level>
            {'LV ' + props.level} &nbsp;{'·'}&nbsp;
          </Level>
          <PageReLoad
            onClick={() => {
              props.pageReLoad();
            }}
          >
            갱신하기
          </PageReLoad>
        </UserLevelWrapper>
      </UserInfoWrapper>
    </UserIdContainer>
  );
};
export default UserId;
