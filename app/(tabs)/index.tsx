// import { Anchor, H2, Paragraph, XStack, YStack, ScrollView } from "tamagui";
// import AddPlayer from "components/features/AddPlayer";
// import ClearStoreButton from "components/features/Scoring/ClearScoreButton";

// export default function TabOneScreen() {
//   return (
//     <YStack f={1} bg="$background">
//       <YStack ai="center" px="$10" pt="$5" pb="$4">
//         <H2 pb="$8" pt="$4">
//           Your symphony awaits...
//         </H2>
//         <ClearStoreButton title="Start New Game" />
//       </YStack>

//       <ScrollView f={1} contentContainerStyle={{ flexGrow: 1 }}>
//         <XStack f={1} ai="center" jc="center" fw="wrap" gap="$1.5">
//           <AddPlayer />
//         </XStack>
//       </ScrollView>
//     </YStack>
//   );
// }

// index.tsx
import { H2, YStack, ScrollView } from "tamagui";
import AddPlayer from "components/features/AddPlayer";
import ClearStoreButton from "components/features/Scoring/ClearScoreButton";

export default function TabOneScreen() {
  return (
    <YStack f={1} bg="$background">
      <YStack ai="center" px="$10" pt="$5" pb="$4" backgroundColor="$primary">
        <H2 pb="$8" pt="$4" color="$secondary">
          Your symphony awaits...
        </H2>
        <ClearStoreButton
          title="Start New Game"
          backgroundColor="$buttonBackground"
          hoverStyle={{
            backgroundColor: "$quaternary",
          }}
        />
      </YStack>

      <ScrollView f={1} contentContainerStyle={{ flexGrow: 1 }}>
        <YStack
          f={1}
          ai="center"
          jc="center"
          gap="$1.5"
          backgroundColor="$background"
        >
          <AddPlayer />
        </YStack>
      </ScrollView>
    </YStack>
  );
}
