import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';
import searchBox from '../../../assets/gg_searchbox_bg.svg';
import searchButton from '../../../assets/gg_searchbox_button.svg';

export const SearchBoxContainer = styled.div`
  width: 314px;
  height: 38px;
  background-image: url(${searchBox});
  border-radius: 18px;
  box-shadow: 0 2px 4px 0 ${Palette.GG_SEARCH_SHADOW};
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

export const SearchField = styled.input`
  width: 200px;
  height: 24px;
  margin-left: 48px;
  border: none;
  outline-style: none;
  font-size: 12px;
  font-weight: 400;
  color: ${Palette.GG_WHITE_100};
  background-color: transparent;
`;

export const SearchButton = styled.div`
  width: 28px;
  height: 38px;
  margin-left: 22px;
  cursor: pointer;
  background-image: url(${searchButton});
`;
