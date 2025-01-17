// types.ts
export interface PlayerRoundPoints {
    round1: number
    round2: number
    round3: number
    round4: number
    round5: number
}

export interface RoundDetails {
    bandType: string
    bandBonus: number
    venue: number
    venueBonus: number
    musicSelection: number
    musicBonus: number
    musiciansRowOne: number
    musiciansRowTwo: number
    musiciansRowThree: number
    specialtyMusicians: number
    principalMusicianSecondChair: number
    principalMusicianFirstChair: number
    conductor: number
    podium: number
    marketingTokens: number,
    specialGuest: number
    eventManager: number
    DecrescendoCardOne: number
    DecrescendoCardTwo: number
    crescendoCardOne: number
    crescendoCardTwo: number
}

export interface RoundScoring {
    round1: RoundDetails
    round2: RoundDetails
    round3: RoundDetails
    round4: RoundDetails
    round5: RoundDetails
}

export interface Player {
    id: string
    name: string
    roundPoints: PlayerRoundPoints
    roundScoring: RoundScoring
}