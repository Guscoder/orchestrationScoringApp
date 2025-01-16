import { YStack, H1 } from 'tamagui'

export default function HomeScreen() {
  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="$background"
    >
      <H1>Welcome to Orchestration!</H1>
    </YStack>
  )
}