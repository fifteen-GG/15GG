export interface summonerDetail {
  summoner_name: string;
  champion_name: string;
  rank: string;
  champ_level: number;
  spells: {
    spell1: string;
    spell2: string;
  };
  perks: {
    perk: string;
    perkStyle: string;
  };
  items: number[];
  gold_earned: number;
  kills: number;
  deaths: number;
  assists: number;
  total_damage_dealt_to_champions: number;
  total_damage_take: number;
  win: Boolean;
}

export interface teamDetail {
  team: string;
  team_avg_data: teamAvgData;
  participants: [
    summonerDetail,
    summonerDetail,
    summonerDetail,
    summonerDetail,
    summonerDetail,
  ];
}

export interface teamAvgData {
  golds: number;
  kills: number;
  level: number;
}
export interface socketDetail {
  summonerName: string;
  championName: string;
  rank: string;
  spells: {
    spell1: string;
    spell2: string;
  };
  perks: {
    perk: number;
    perkStyle: number;
  };
  isDead: boolean;
  level: number;
  team: string;
  champLevel: number;
  items: item[];
  kills: number;
  deaths: number;
  assists: number;
  gold: number;
}
export interface SocketData {
  blue_team_win_rate: number;
  timestamp: number;
  player_data: [
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
    socketDetail,
  ];
}
export type Participants = [
  socketDetail,
  socketDetail,
  socketDetail,
  socketDetail,
  socketDetail,
  socketDetail,
  socketDetail,
  socketDetail,
  socketDetail,
  socketDetail,
];
interface item {
  itemID: number;
  count: number;
}
