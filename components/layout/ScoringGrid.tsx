// components/ScoringGrid.tsx
import { YStack, XStack } from 'tamagui'
import { usePlayerStore } from 'store/usePlayerStore'
import { RoundScoresGridCell } from 'components/features/GameTotals/RoundScoresGridCell'
import { PlayerRoundPoints } from 'store/types'

export default function ScoringGrid() {
  const players = usePlayerStore((state) => state.players)

  // Determine which rounds have non-zero scores
  const activeRounds = [1, 2, 3, 4, 5].filter(roundNum => {
    const roundKey = `round${roundNum}` as keyof PlayerRoundPoints
    return players.some(player => player.roundPoints[roundKey] > 0)
  })

  // Calculate dynamic widths based on number of active rounds
  const nameColumnWidth = activeRounds.length === 1 ? "50%" : "30%"
  const remainingWidth = `${100 - parseInt(nameColumnWidth)}%`
  const roundColumnWidth = activeRounds.length > 0 
    ? `${100 / activeRounds.length}%` 
    : "20%"

  // Find the highest score across all rounds and players
  const highestScore = activeRounds.reduce((maxScore, roundNum) => {
    const roundKey = `round${roundNum}` as keyof PlayerRoundPoints
    const roundMax = Math.max(...players.map(p => p.roundPoints[roundKey]))
    return Math.max(maxScore, roundMax)
  }, 0)

  return (
    <YStack 
      flex={1} 
      alignItems="center" 
      justifyContent="center"
      padding="$4"
      backgroundColor="$background"
    >
      <YStack 
        width="100%"
        maxWidth={1000}
        $gtXs={{ maxWidth: 600 }}
        $gtSm={{ maxWidth: 700 }}
        $gtMd={{ maxWidth: 800 }}
        $gtLg={{ maxWidth: 1000 }}
      >
        {/* Column Headers */}
        <XStack width="100%" flexDirection="row">
          <RoundScoresGridCell 
            width={nameColumnWidth}
          >
            Player
          </RoundScoresGridCell>
          <XStack flex={1} flexDirection="row">
            {activeRounds.map((roundNum) => (
              <RoundScoresGridCell 
                key={roundNum} 
                width={roundColumnWidth}
                borderLeftWidth={0}
              >
                Round {roundNum}
              </RoundScoresGridCell>
            ))}
          </XStack>
        </XStack>

        {/* Player Rows */}
        {players.map((player) => (
          <XStack 
            key={player.id} 
            width="100%"
            flexDirection="row"
          >
            <RoundScoresGridCell 
              width={nameColumnWidth}
              borderTopWidth={0}
            >
              {player.name}
            </RoundScoresGridCell>
            <XStack flex={1} flexDirection="row">
              {activeRounds.map((roundNum) => {
                const roundKey = `round${roundNum}` as keyof PlayerRoundPoints
                const score = player.roundPoints[roundKey]
                return (
                  <RoundScoresGridCell 
                    key={roundNum}
                    width={roundColumnWidth}
                    borderLeftWidth={0}
                    borderTopWidth={0}
                    isHighestScore={score > 0 && score === highestScore}
                  >
                    {score}
                  </RoundScoresGridCell>
                )
              })}
            </XStack>
          </XStack>
        ))}
      </YStack>
    </YStack>
  )
}