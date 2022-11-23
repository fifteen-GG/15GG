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
export const formatChampName = (name: string) => {
  if (name === '가렌') return 'Garen';
  if (name === '갈리오') return 'Galio';
  if (name === '갱플랭크') return 'Gangplank';
  if (name === '그라가스') return 'Gragas';
  if (name === '그레이브즈') return 'Graves';
  if (name === '그웬') return 'Gwen';
  if (name === '나르') return 'Gnar';
  if (name === '나미') return 'Nami';
  if (name === '나서스') return 'Nasus';
  if (name === '노틸러스') return 'Nautilus';
  if (name === '녹턴') return 'Nocturne';
  if (name === '누누와 윌럼프') return 'Nunu';
  if (name === '니달리') return 'Nidalee';
  if (name === '니코') return 'Neeko';
  if (name === '닐라') return 'Nilah';
  if (name === '다리우스') return 'Darius';
  if (name === '다이애나') return 'Diana';
  if (name === '드레이븐') return 'Draven';
  if (name === '라이즈') return 'Ryze';
  if (name === '라칸') return 'Rakan';
  if (name === '람머스') return 'Rammus';
  if (name === '럭스') return 'Lux';
  if (name === '럼블') return 'Rumble';
  if (name === '레나타 글라스크') return 'Renata';
  if (name === '레넥톤') return 'Renekton';
  if (name === '레오나') return 'Leona';
  if (name === '렉사이') return 'Reksai';
  if (name === '렐') return 'Rell';
  if (name === '렝가') return 'Rengar';
  if (name === '루시안') return 'Lucian';
  if (name === '룰루') return 'Lulu';
  if (name === '르블랑') return 'Leblanc';
  if (name === '리 신') return 'Leesin';
  if (name === '리븐') return 'Riven';
  if (name === '리산드라') return 'Lissandra';
  if (name === '릴리아') return 'Lillia';
  if (name === '마스터 이') return 'Masteryi';
  if (name === '마오카이') return 'Maokai';
  if (name === '말자하') return 'Malzahar';
  if (name === '말파이트') return 'Malphite';
  if (name === '모데카이저') return 'Mordekaiser';
  if (name === '모르가나') return 'Morgana';
  if (name === '문도 박사') return 'Drmundo';
  if (name === '미스 포츈') return 'Missfortune';
  if (name === '바드') return 'Bard';
  if (name === '바루스') return 'Varus';
  if (name === '바이') return 'Vi';
  if (name === '베이가') return 'Veigar';
  if (name === '베인') return 'Vayne';
  if (name === '벡스') return 'Vex';
  if (name === '벨베스') return 'Belveth';
  if (name === '벨코즈') return 'Velkoz';
  if (name === '볼리베어') return 'Volibear';
  if (name === '브라움') return 'Braum';
  if (name === '브랜드') return 'Brand';
  if (name === '블라디미르') return 'Vladimir';
  if (name === '블리츠크랭크') return 'Blitzcrank';
  if (name === '비에고') return 'Viego';
  if (name === '빅토르') return 'Viktor';
  if (name === '뽀삐') return 'Poppy';
  if (name === '사미라') return 'Samira';
  if (name === '사이온') return 'Sion';
  if (name === '사일러스') return 'Sylas';
  if (name === '샤코') return 'Shaco';
  if (name === '세나') return 'Senna';
  if (name === '세라핀') return 'Seraphine';
  if (name === '세주아니') return 'Sejuani';
  if (name === '세트') return 'Sett';
  if (name === '소나') return 'Sona';
  if (name === '소라카') return 'Soraka';
  if (name === '쉔') return 'Shen';
  if (name === '쉬바나') return 'Shyvana';
  if (name === '스웨인') return 'Swain';
  if (name === '스카너') return 'Skarner';
  if (name === '시비르') return 'Sivir';
  if (name === '신 짜오') return 'Xinzhao';
  if (name === '신드라') return 'Syndra';
  if (name === '신지드') return 'Singed';
  if (name === '쓰레쉬') return 'Thresh';
  if (name === '아리') return 'Ahri';
  if (name === '아무무') return 'Amumu';
  if (name === '아우렐리온 솔') return 'Aurelionsol';
  if (name === '아이번') return 'Ivern';
  if (name === '아지르') return 'Azir';
  if (name === '아칼리') return 'Akali';
  if (name === '아크샨') return 'Akshan';
  if (name === '아트록스') return 'Aatrox';
  if (name === '아펠리오스') return 'Aphelios';
  if (name === '알리스타') return 'Alistar';
  if (name === '애니') return 'Annie';
  if (name === '애니비아') return 'Anivia';
  if (name === '애쉬') return 'Ashe';
  if (name === '야스오') return 'Yasuo';
  if (name === '에코') return 'Ekko';
  if (name === '엘리스') return 'Elise';
  if (name === '오공') return 'Monkeyking';
  if (name === '오른') return 'Ornn';
  if (name === '오리아나') return 'Orianna';
  if (name === '올라프') return 'Olaf';
  if (name === '요네') return 'Yone';
  if (name === '요릭') return 'Yorick';
  if (name === '우디르') return 'Udyr';
  if (name === '우르곳') return 'Urgot';
  if (name === '워윅') return 'Warwick';
  if (name === '유미') return 'Yuumi';
  if (name === '이렐리아') return 'Irelia';
  if (name === '이블린') return 'Evelynn';
  if (name === '이즈리얼') return 'Ezreal';
  if (name === '일라오이') return 'Illaoi';
  if (name === '자르반 4세') return 'Jarvaniv';
  if (name === '자야') return 'Xayah';
  if (name === '자이라') return 'Zyra';
  if (name === '자크') return 'Zac';
  if (name === '잔나') return 'Janna';
  if (name === '잭스') return 'Jax';
  if (name === '제드') return 'Zed';
  if (name === '제라스') return 'Xerath';
  if (name === '제리') return 'Zeri';
  if (name === '제이스') return 'Jayce';
  if (name === '조이') return 'Zoe';
  if (name === '직스') return 'Ziggs';
  if (name === '진') return 'Jhin';
  if (name === '질리언') return 'Zilean';
  if (name === '징크스') return 'Jinx';
  if (name === '초가스') return 'Chogath';
  if (name === '카르마') return 'Karma';
  if (name === '카밀') return 'Camille';
  if (name === '카사딘') return 'Kassadin';
  if (name === '카서스') return 'Karthus';
  if (name === '카시오페아') return 'Cassiopeia';
  if (name === '카이사') return 'Kaisa';
  if (name === '카직스') return 'Khazix';
  if (name === '카타리나') return 'Katarina';
  if (name === '칼리스타') return 'Kalista';
  if (name === '케넨') return 'Kennen';
  if (name === '케이틀린') return 'Caitlyn';
  if (name === '케인') return 'Kayn';
  if (name === '케일') return 'Kayle';
  if (name === '코그모') return 'Kogmaw';
  if (name === '코르키') return 'Corki';
  if (name === '퀸') return 'Quinn';
  if (name === '크산테') return 'Ksante';
  if (name === '클레드') return 'Kled';
  if (name === '키아나') return 'Qiyana';
  if (name === '킨드레드') return 'Kindred';
  if (name === '타릭') return 'Taric';
  if (name === '탈론') return 'Talon';
  if (name === '탈리야') return 'Taliyah';
  if (name === '탐 켄치') return 'Tahmkench';
  if (name === '트런들') return 'Trundle';
  if (name === '트리스타나') return 'Tristana';
  if (name === '트린다미어') return 'Tryndamere';
  if (name === '트위스티드 페이트') return 'Twistedfate';
  if (name === '트위치') return 'Twitch';
  if (name === '티모') return 'Teemo';
  if (name === '파이크') return 'Pyke';
  if (name === '판테온') return 'Pantheon';
  if (name === '피들스틱') return 'Fiddlesticks';
  if (name === '피오라') return 'Fiora';
  if (name === '피즈') return 'Fizz';
  if (name === '하이머딩거') return 'Heimerdinger';
  if (name === '헤카림') return 'Hecarim';
};
