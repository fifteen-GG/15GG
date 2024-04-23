export const formatMatchMode = (queue_mode: string) => {
  let mode = '';
  if (queue_mode === '5v5 Ranked Solo games') {
    mode = '솔로랭크';
  } else if (queue_mode === '5v5 Ranked Flex games') {
    mode = '자유랭크';
  } else if (queue_mode === '5v5 Blind Pick games') {
    mode = '일반게임';
  } else if (queue_mode === '5v5 ARAM games') {
    mode = '칼바람나락';
  } else if (queue_mode === 'Pick URF games') {
    mode = 'U.R.F.';
  } else {
    mode = '사용자설정';
  }
  return mode;
};

export const formatAnalysisStatus = (status: string) => {
  let result = '';
  if (status === 'live') result = '실시간';
  else if (status === 'complete') result = '분석완료';
  else result = '미분석';
  return result;
};

export const formatMatchDate = (date: string) => {
  let result = '';
  result =
    date.slice(0, 4) +
    '년' +
    ' ' +
    date.slice(5, 7) +
    '월' +
    ' ' +
    date.slice(8, 10) +
    '일';
  return result;
};
