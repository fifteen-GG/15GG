import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SearchBoxContainer,
  SearchField,
  SearchButton,
} from '../styles/searchbox.s';

export const SearchBox = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <SearchBoxContainer>
      <SearchField
        placeholder="소환사명 검색하기..."
        onChange={handleSearchValue}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') navigate(`/user?ID=${searchValue}`);
        }}
      ></SearchField>
      <SearchButton onClick={() => navigate(`/user?ID=${searchValue}`)} />
    </SearchBoxContainer>
  );
};
