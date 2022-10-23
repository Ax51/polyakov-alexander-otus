export interface ISavedStatistics {
  score: [number, number]
  playedRounds: number
}

export enum ECalcTypes {
  'addition' = '+',
  'subtraction' = '-',
  'multiplication' = '*',
  'division' = '/'
}

export enum EDifficuiltyTypes {
  'easy' = 1,
  'medium',
  'hard'
}

export interface ISavedSettings {
  calcType: keyof typeof ECalcTypes
  difficulty: keyof typeof EDifficuiltyTypes
  time: string
}
