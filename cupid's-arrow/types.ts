export interface CoupleData {
  partnerName: string;
  senderName: string;
  isConfigured: boolean;
}

export enum AppState {
  CONFIG = 'CONFIG',
  PROPOSAL = 'PROPOSAL',
  CELEBRATION = 'CELEBRATION'
}

export enum DateVibe {
  ROMANTIC = 'Romantic',
  ADVENTUROUS = 'Adventurous',
  COZY = 'Cozy',
  FOODIE = 'Foodie'
}