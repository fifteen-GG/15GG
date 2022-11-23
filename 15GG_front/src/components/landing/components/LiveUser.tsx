import {
  UserContainer,
  UserInfoWrapper,
  ImageWrapper,
  UserPosition,
  UserChampion,
  UserName,
} from '../styles/liveuser.s';

interface propsType {
  champion: string;
  name: string;
  row: string;
  pos: string;
}

export const LiveUser = (props: propsType) => {
  return (
    <UserContainer>
      {props.row === 'left' ? (
        <UserInfoWrapper>
          <UserPosition position={`${props.pos}`} />
          <ImageWrapper>
            <UserChampion
              src={
                process.env.REACT_APP_DDRAGON_API_ROOT +
                `/champion/${props.champion}.png`
              }
            />
          </ImageWrapper>
          <UserName style={{ marginLeft: '2px' }}>{props.name}</UserName>
        </UserInfoWrapper>
      ) : (
        <UserInfoWrapper style={{ justifyContent: 'flex-end' }}>
          <UserName style={{ marginRight: '2px' }}>{props.name}</UserName>
          <ImageWrapper>
            <UserChampion
              src={
                process.env.REACT_APP_DDRAGON_API_ROOT +
                `/champion/${props.champion}.png`
              }
            />
          </ImageWrapper>
          <UserPosition position={`${props.pos}`} />
        </UserInfoWrapper>
      )}
    </UserContainer>
  );
};
