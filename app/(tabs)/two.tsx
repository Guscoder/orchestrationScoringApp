import ScoringBreakdownGrid from 'components/features/GameTotals/ScoringBreakdownGrid'
import ScoringEntryGrid from 'components/features/GameTotals/ScoringEntryGrid'
import ScoringGrid from 'components/layout/ScoringGrid'
import { Text, View, ScrollView, YStack } from 'tamagui'

export default function TabTwoScreen() {
  return (
    <ScrollView width="100%" backgroundColor="$background">
      <YStack 
        padding="$4" 
        alignItems="center" 
        gap="$4"
      >
        <Text fontSize={20} color="$blue10">
          Orchestration
        </Text>
        <ScoringGrid />
        <ScoringEntryGrid />
        {/* <ScoringBreakdownGrid /> */}
      </YStack>
    </ScrollView>
  )
}