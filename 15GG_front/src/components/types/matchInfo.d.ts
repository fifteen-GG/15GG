import { gameState, queue_mode } from './enum';
export interface MatchInfoType {
  status: gameState;
  match_id: string;
  game_duration: number;
  win: boolean;
  created_at: string;
  queue_mode: queue_mode;
  champion_name: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  cs: number;
  cs_per_min: number;
  vision_wards_bought_in_game: number;
  items: number[];
  spells: {
    spell1: string;
    spell2: string;
  };
  perks: {
    perk: string;
    perk_style: string;
  };
}
