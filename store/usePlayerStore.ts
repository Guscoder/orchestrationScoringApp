// usePlayerStore.ts
import { create } from 'zustand'
import { Player, PlayerRoundPoints, RoundScoring, RoundDetails } from './types'

interface PlayerStore {
    players: Player[]
    addPlayer: (name: string) => void
    updatePlayerScore: (playerId: string, round: keyof PlayerRoundPoints, score: number) => void
    updateRoundScoring: (playerId: string, round: keyof RoundScoring, details: Partial<RoundDetails>) => void
}

const createEmptyRoundDetails = (): RoundDetails => ({
    bandType: '',
    bandBonus: 0,
    venue: 0,
    venueBonus: 0,
    musicSelection: 0,
    musicBonus: 0,
    musiciansRowOne: 0,
    musiciansRowTwo: 0,
    musiciansRowThree: 0,
    specialtyMusicians: 0,
    principalMusicianSecondChair: 0,
    principalMusicianFirstChair: 0,
    conductor: 0,
    podium: 0,
    specialGuest: 0,
    eventManager: 0,
    marketingTokens: 0,
    DecrescendoCardOne: 0,
    DecrescendoCardTwo: 0,
    crescendoCardOne: 0,
    crescendoCardTwo: 0
})

const createEmptyRoundScoring = (): RoundScoring => ({
    round1: createEmptyRoundDetails(),
    round2: createEmptyRoundDetails(),
    round3: createEmptyRoundDetails(),
    round4: createEmptyRoundDetails(),
    round5: createEmptyRoundDetails()
})

export const usePlayerStore = create<PlayerStore>((set) => ({
    players: [
        {
          id: "1",
          name: "Mike",
          roundPoints: {
            round1: 42,
            round2: 35,
            round3: 0,
            round4: 0,
            round5: 0
          },
          roundScoring: {
            round1: {
              bandType: 5,
              bandBonus: 2,
              venue: 4,
              venueBonus: 1,
              musiciansRowOne: 6,
              musiciansRowTwo: 4,
              musiciansRowThree: 3,
              specialtyMusicians: 2,
              principalMusicianSecondChair: 4,
              principalMusicianFirstChair: 0,
              conductor: 3,
              podium: 2,
              musicSelection: 3,
              musicBonus: 1,
              specialGuest: 0,
              eventManager: 2,
              marketingTokens: 15,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round2: {
              bandType: 4,
              bandBonus: 0,
              venue: 5,
              venueBonus: 2,
              musiciansRowOne: 4,
              musiciansRowTwo: 3,
              musiciansRowThree: 2,
              specialtyMusicians: 3,
              principalMusicianSecondChair: 2,
              principalMusicianFirstChair: 0,
              conductor: 4,
              podium: 1,
              musicSelection: 2,
              musicBonus: 2,
              specialGuest: 1,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round3: {
              bandType: 0,
              bandBonus: 0,
              venue: 0,
              venueBonus: 0,
              musiciansRowOne: 0,
              musiciansRowTwo: 0,
              musiciansRowThree: 0,
              specialtyMusicians: 0,
              principalMusicianSecondChair: 0,
              principalMusicianFirstChair: 0,
              conductor: 0,
              podium: 0,
              musicSelection: 0,
              musicBonus: 0,
              specialGuest: 0,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round4: {
              bandType: 0,
              bandBonus: 0,
              venue: 0,
              venueBonus: 0,
              musiciansRowOne: 0,
              musiciansRowTwo: 0,
              musiciansRowThree: 0,
              specialtyMusicians: 0,
              principalMusicianSecondChair: 0,
              principalMusicianFirstChair: 0,
              conductor: 0,
              podium: 0,
              musicSelection: 0,
              musicBonus: 0,
              specialGuest: 0,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round5: {
              bandType: 0,
              bandBonus: 0,
              venue: 0,
              venueBonus: 0,
              musiciansRowOne: 0,
              musiciansRowTwo: 0,
              musiciansRowThree: 0,
              specialtyMusicians: 0,
              principalMusicianSecondChair: 0,
              principalMusicianFirstChair: 0,
              conductor: 0,
              podium: 0,
              musicSelection: 0,
              musicBonus: 0,
              specialGuest: 0,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            }
          }
        },
        {
          id: "2",
          name: "Ren",
          roundPoints: {
            round1: 38,
            round2: 44,
            round3: 0,
            round4: 0,
            round5: 0
          },
          roundScoring: {
            round1: {
              bandType: 4,
              bandBonus: 1,
              venue: 5,
              venueBonus: 0,
              musiciansRowOne: 5,
              musiciansRowTwo: 4,
              musiciansRowThree: 2,
              specialtyMusicians: 3,
              principalMusicianSecondChair: 2,
              principalMusicianFirstChair: 0,
              conductor: 4,
              podium: 2,
              musicSelection: 3,
              musicBonus: 1,
              specialGuest: 2,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round2: {
              bandType: 6,
              bandBonus: 2,
              venue: 4,
              venueBonus: 2,
              musiciansRowOne: 5,
              musiciansRowTwo: 4,
              musiciansRowThree: 3,
              specialtyMusicians: 2,
              principalMusicianSecondChair: 4,
              principalMusicianFirstChair: 0,
              conductor: 3,
              podium: 2,
              musicSelection: 4,
              musicBonus: 2,
              specialGuest: 1,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round3: {
              bandType: 0,
              bandBonus: 0,
              venue: 0,
              venueBonus: 0,
              musiciansRowOne: 0,
              musiciansRowTwo: 0,
              musiciansRowThree: 0,
              specialtyMusicians: 0,
              principalMusicianSecondChair: 0,
              principalMusicianFirstChair: 0,
              conductor: 0,
              podium: 0,
              musicSelection: 0,
              musicBonus: 0,
              specialGuest: 0,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round4: {
              bandType: 0,
              bandBonus: 0,
              venue: 0,
              venueBonus: 0,
              musiciansRowOne: 0,
              musiciansRowTwo: 0,
              musiciansRowThree: 0,
              specialtyMusicians: 0,
              principalMusicianSecondChair: 0,
              principalMusicianFirstChair: 0,
              conductor: 0,
              podium: 0,
              musicSelection: 0,
              musicBonus: 0,
              specialGuest: 0,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round5: {
              bandType: 0,
              bandBonus: 0,
              venue: 0,
              venueBonus: 0,
              musiciansRowOne: 0,
              musiciansRowTwo: 0,
              musiciansRowThree: 0,
              specialtyMusicians: 0,
              principalMusicianSecondChair: 0,
              principalMusicianFirstChair: 0,
              conductor: 0,
              podium: 0,
              musicSelection: 0,
              musicBonus: 0,
              specialGuest: 0,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            }
          }
        },
        {
          id: "3",
          name: "Gus",
          roundPoints: {
            round1: 40,
            round2: 39,
            round3: 0,
            round4: 0,
            round5: 0
          },
          roundScoring: {
            round1: {
              bandType: 5,
              bandBonus: 0,
              venue: 4,
              venueBonus: 2,
              musiciansRowOne: 5,
              musiciansRowTwo: 3,
              musiciansRowThree: 3,
              specialtyMusicians: 2,
              principalMusicianSecondChair: 3,
              principalMusicianFirstChair: 0,
              conductor: 4,
              podium: 2,
              musicSelection: 4,
              musicBonus: 1,
              specialGuest: 0,
              eventManager: 2,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round2: {
              bandType: 5,
              bandBonus: 1,
              venue: 4,
              venueBonus: 1,
              musiciansRowOne: 5,
              musiciansRowTwo: 4,
              musiciansRowThree: 2,
              specialtyMusicians: 3,
              principalMusicianSecondChair: 2,
              principalMusicianFirstChair: 0,
              conductor: 3,
              podium: 2,
              musicSelection: 3,
              musicBonus: 2,
              specialGuest: 2,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round3: {
              bandType: 0,
              bandBonus: 0,
              venue: 0,
              venueBonus: 0,
              musiciansRowOne: 0,
              musiciansRowTwo: 0,
              musiciansRowThree: 0,
              specialtyMusicians: 0,
              principalMusicianSecondChair: 0,
              principalMusicianFirstChair: 0,
              conductor: 0,
              podium: 0,
              musicSelection: 0,
              musicBonus: 0,
              specialGuest: 0,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round4: {
              bandType: 0,
              bandBonus: 0,
              venue: 0,
              venueBonus: 0,
              musiciansRowOne: 0,
              musiciansRowTwo: 0,
              musiciansRowThree: 0,
              specialtyMusicians: 0,
              principalMusicianSecondChair: 0,
              principalMusicianFirstChair: 0,
              conductor: 0,
              podium: 0,
              musicSelection: 0,
              musicBonus: 0,
              specialGuest: 0,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            },
            round5: {
              bandType: 0,
              bandBonus: 0,
              venue: 0,
              venueBonus: 0,
              musiciansRowOne: 0,
              musiciansRowTwo: 0,
              musiciansRowThree: 0,
              specialtyMusicians: 0,
              principalMusicianSecondChair: 0,
              principalMusicianFirstChair: 0,
              conductor: 0,
              podium: 0,
              musicSelection: 0,
              musicBonus: 0,
              specialGuest: 0,
              eventManager: 0,
              DecrescendoCardOne: 0,
              DecrescendoCardTwo: 0,
              crescendoCardOne: 0,
              crescendoCardTwo: 0
            }
          }
        }
      ],
    
    addPlayer: (name) => set((state) => ({
        players: [...state.players, {
            id: Date.now().toString(),
            name,
            roundPoints: {
                round1: 0,
                round2: 0,
                round3: 0,
                round4: 0,
                round5: 0
            },
            roundScoring: createEmptyRoundScoring()
        }]
    })),

    updatePlayerScore: (playerId, round, score) => set((state) => ({
        players: state.players.map(player => 
            player.id === playerId 
                ? { ...player, roundPoints: { ...player.roundPoints, [round]: score } }
                : player
        )
    })),

    updateRoundScoring: (playerId, round, details) => set((state) => ({
        players: state.players.map(player => {
            if (player.id !== playerId) return player

            return {
                ...player,
                roundScoring: {
                    ...player.roundScoring,
                    [round]: {
                        ...player.roundScoring[round],
                        ...details
                    }
                }
            }
        })
    }))
}))