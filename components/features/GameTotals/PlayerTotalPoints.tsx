// components/PlayerRoundScores.tsx
import { XStack, Text } from 'tamagui'
import { Player } from '../store/types'

interface PlayerRoundScoresProps {
    player: Player
}

export function PlayerRoundScores({ player }: PlayerRoundScoresProps) {
    return (
        <XStack 
            space="$4"
            justifyContent="space-between"
            paddingHorizontal="$4"
            paddingVertical="$2"
            backgroundColor="$background"
            borderRadius="$2"
        >
            <Text flex={2} fontWeight="bold">{player.name}</Text>
            <Text flex={1} textAlign="center">{player.roundPoints.round1}</Text>
            <Text flex={1} textAlign="center">{player.roundPoints.round2}</Text>
            <Text flex={1} textAlign="center">{player.roundPoints.round3}</Text>
            <Text flex={1} textAlign="center">{player.roundPoints.round4}</Text>
            <Text flex={1} textAlign="center">{player.roundPoints.round5}</Text>
        </XStack>
    )
}