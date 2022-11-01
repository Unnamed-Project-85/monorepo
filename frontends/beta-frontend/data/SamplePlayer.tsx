export type Position = 'DEFENDER' | 'MIDDLE' | 'FORWARD'

export type Skill = 'DEFENSE_POSITION' | 'BALL_CONTROL' | 'SCORE' | 'PASSING' | 'OFFENSIVE_POSITION' | 'TACKLING' | 'CO'

export type Stats = {
  [skill in Skill]: number
}

export interface PlayerStats {
  id: string
  age: number
  name: string
  position: Position
  stats: Stats
}

export const samplePlayer: PlayerStats = {
  id: 'devin-gibson',
  age: 32,
  name: 'Devin Gibson',
  position: 'DEFENDER',
  stats: {
    DEFENSE_POSITION: 77,
    BALL_CONTROL: 12,
    SCORE: 10,
    PASSING: 14,
    OFFENSIVE_POSITION: 11,
    TACKLING: 60,
    CO: 19
  }
}

export const players: PlayerStats[] = [
  samplePlayer,
  {
    id: 'gonzalo-higuain',
    age: 32,
    name: 'Gonzalo Higuain',
    position: 'FORWARD',
    stats: {
      DEFENSE_POSITION: 77,
      BALL_CONTROL: 12,
      SCORE: 10,
      PASSING: 14,
      OFFENSIVE_POSITION: 11,
      TACKLING: 60,
      CO: 19
    }
  },
  {
    id: 'xavi-hernander',
    age: 32,
    name: 'Xavi Hernandez',
    position: 'MIDDLE',
    stats: {
      DEFENSE_POSITION: 77,
      BALL_CONTROL: 12,
      SCORE: 10,
      PASSING: 14,
      OFFENSIVE_POSITION: 11,
      TACKLING: 60,
      CO: 19
    }
  }
]
