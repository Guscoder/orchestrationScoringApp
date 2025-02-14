// usePlayerStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Player, PlayerRoundPoints, RoundScoring, RoundDetails } from './types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

interface PlayerStore {
    players: Player[]
    addPlayer: (name: string) => void
    addPlayers: (names: string[]) => void  // New batch operation
    updatePlayerScore: (playerId: string, round: keyof PlayerRoundPoints, score: number) => void
    updateRoundScoring: (playerId: string, round: keyof RoundScoring, details: Partial<RoundDetails>) => void
    clearStore: () => void
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

const storage = createJSONStorage(() => {
    if (Platform.OS === 'web') {
        return localStorage
    }
    return AsyncStorage
})

export const usePlayerStore = create<PlayerStore>()(
    persist(
        (set) => ({
            players: [],
            
            addPlayer: (name) => set((state) => ({
                players: [...state.players, {
                    id: `${Date.now().toString()}${name}`,
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

            // New batch operation to add multiple players at once
            addPlayers: (names) => set((state) => ({
                players: [
                    ...state.players,
                    ...names.map(name => ({
                        id: `${Date.now().toString()}${name}`,
                        name,
                        roundPoints: {
                            round1: 0,
                            round2: 0,
                            round3: 0,
                            round4: 0,
                            round5: 0
                        },
                        roundScoring: createEmptyRoundScoring()
                    }))
                ]
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
            })),
            
            clearStore: () => set({ players: [] })
        }),
        {
            name: 'orchestration-player-storage',
            version: 1,
            storage: storage,
            onRehydrateStorage: () => (state) => {
                console.log('hydration starts')
            }
        }
    )
)