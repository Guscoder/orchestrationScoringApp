// types.ts
export interface PlayerRoundPoints {
    round1: number
    round2: number
    round3: number
    round4: number
    round5: number
}

export interface RoundDetails {
    bandType: number
    bandBonus: number
    venue: number
    venueBonus: number
    musiciansRow1: number
    musiciansRow2: number
    musiciansRow3: number
    specialtyMusicians: number
    principalMusicians2: number
    principalMusicians5: number
    conductor: number
    podium: number
    musicSelection: number
    musicBonus: number
    specialGuest: number
    eventManager: number
    decrescendoCard1: number
    decrescendoCard2: number
    crescendoCard1: number
    crescendoCard2: number
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