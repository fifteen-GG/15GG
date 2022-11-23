import styled from 'styled-components';
import * as Palette from '../../../assets/colorPalette';

//UserGraph 스타일
export const UserGraphContainer = styled.div`
  width: 100%;
  height: 180px;
  margin-bottom: 8px;
  background-color: ${Palette.GG_BLACK_70};
  border-radius: 6px;
  display: flex;
  position: relative;
`;
export const UserGraphWrapper = styled.div`
  width: 328px;
  margin: 0 auto;
`;
export const UserGraphImg = styled.div`
  margin: 0 auto;
  margin-top: 5px;
  width: 170px;
  height: 170px;
`;
export const UserGraphText = styled.div`
  position: absolute;
  margin-left: 14px;
  margin-top: 10px;
`;
export const ColumnLabel = styled.div`
  display: flex;
`;
export const ColumnBox = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 4px;
  border-radius: 2px;
`;
export const ColumnName = styled.div`
  font-size: 10px;
  color: ${Palette.GG_WHITE_100};
`;

// export const AvgGraphLabel = styled.div`
//   display: flex;
// `;
// export const AvgColumn = styled.div`
//   width: 10px;
//   height: 10px;
//   margin-right: 4px;
//   background-color: ${Palette.GG_GREY_70};
//   border-radius: 2px;
// `;
// export const AvgName = styled.div`
//   font-size: 10px;
//   color: ${Palette.GG_WHITE_100};
// `;
