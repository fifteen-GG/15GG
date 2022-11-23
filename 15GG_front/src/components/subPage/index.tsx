// import * as S from './styled';
import { useNavigate } from 'react-router-dom';
import { DataCode } from '../dataCode';
import { GameAnalysis } from '../gameAnalysis';
import { UserInfo } from '../userInfo';
import logo from '../../assets/gg_logo_temp.svg';
import styled from 'styled-components';
import { PageEnum } from '../types/enum';

const SubPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const SubPageHeaderWrapper = styled.div`
  height: 48px;
  background: #27282d;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const SubPageHeader = styled.div`
  @media screen and (max-width: 650px) {
    width: 100%;
  }
  @media screen and (min-width: 651px) {
    width: 650px;
  }
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoBox = styled.img`
  margin-top: 4px;
  width: 86px;
  object-fit: contain;
  color: white;
  cursor: pointer;
`;

const SubPageContentWrapper = styled.div`
  background: #1e2025;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 48px);
`;

const SubPageContent = styled.div`
  @media screen and (max-width: 650px) {
    width: 100%;
  }
  @media screen and (min-width: 651px) {
    width: 650px;
  }
  padding: 16px;
`;
interface propsType {
  page: PageEnum;
}
export const SubPage = (props: propsType) => {
  const navigate = useNavigate();
  // const routeLanding = () => {
  //   navigate(`/`);
  // };
  const renderContent = () => {
    if (props.page === PageEnum.CODE) return <DataCode />;
    else if (props.page === PageEnum.LIVE) return <GameAnalysis />;
    else if (props.page === PageEnum.USER) return <UserInfo />;
  };
  return (
    <SubPageContainer>
      <SubPageHeaderWrapper>
        <SubPageHeader>
          <LogoBox src={logo} onClick={() => navigate(`/`)} />
        </SubPageHeader>
      </SubPageHeaderWrapper>
      <SubPageContentWrapper>
        <SubPageContent>
          <>{renderContent()}</>
        </SubPageContent>
      </SubPageContentWrapper>
    </SubPageContainer>
  );
};
