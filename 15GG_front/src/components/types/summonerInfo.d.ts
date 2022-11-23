export interface SummonerInitialType {
  id: string;
  puuid: string;
  name: string;
  level: number;
  profile_icon_id: string;
  solo: RankData;
  flex: RankData;
  kda_avg: number;
  kills_avg: number;
  deaths_avg: number;
  assists_avg: number;
  // prefer_position: prefer_position;
  prefer_position: {
    TOP?: number;
    JG?: number;
    MID?: number;
    ADC?: number;
    SUP?: number;
    '-': number;
  };
  champions: preferChampion;
}

export interface SummonerInfoType {
  name: string;
  level: number;
  profile_icon_id: string;
  soloRank: userRank;
  flexRank: userRank;
  kda_avg: number;
  kills_avg: number;
  deaths_avg: number;
  assists_avg: number;
  // prefer_position: prefer_position;
  prefer_position: {
    TOP?: number;
    JG?: number;
    MID?: number;
    ADC?: number;
    SUP?: number;
    '-': number;
  };
  champions: userChampion;
}

export interface playData {
  champion_name: string;
  counts: number;
  kills: number;
  deaths: number;
  assists: number;
  wins: number;
}
export interface RankData {
  tier: string;
  rank: any;
  lp: number;
  wins: number;
  losses: number;
}
export interface userRank {
  name: string;
  tier: string;
  lp: number;
  win_rate: number;
  wins: number;
  losses: number;
}
export type userChampion = [
  {
    champion_name: string;
    counts: number;
    win_rate: string | number;
    kda: string | number;
  },
  {
    champion_name: string;
    counts: number;
    win_rate: string | number;
    kda: string | number;
  },
  {
    champion_name: string;
    counts: number;
    win_rate: string | number;
    kda: string | number;
  },
];
export type preferChampion = [
  {
    champion_name: string;
    counts: number;
    kills: number;
    deaths: number;
    assists: number;
    wins: number;
  },
  {
    champion_name: string;
    counts: number;
    kills: number;
    deaths: number;
    assists: number;
    wins: number;
  },
  {
    champion_name: string;
    counts: number;
    kills: number;
    deaths: number;
    assists: number;
    wins: number;
  },
];
