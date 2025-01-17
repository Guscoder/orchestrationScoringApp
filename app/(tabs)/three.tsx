import ScoringBreakdownGrid from 'components/features/GameTotals/ScoringBreakdownGrid'
import ScoringGrid from 'components/layout/ScoringGrid'
import { Text, View, ScrollView, YStack } from 'tamagui'

export default function TabThreeScreen() {
  return (
    <ScrollView width="100%" backgroundColor="$background">
      <YStack 
        padding="$4" 
        alignItems="center" 
        gap="$4"
      >
        <Text fontSize={20} color="$blue10">
          Round Stats
        </Text>
        <ScoringBreakdownGrid />
      </YStack>
    </ScrollView>
  )
}