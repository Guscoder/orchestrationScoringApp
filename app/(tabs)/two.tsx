// import AddPlayer from "components/features/AddPlayer";
// import ScoringBreakdownGrid from "components/features/GameTotals/ScoringBreakdownGrid";
// import ScoringEntryForm from "components/features/GameTotals/ScoringEntryGrid";
// import ScoringGrid from "components/layout/ScoringGrid";
// import { Text, View, ScrollView, YStack } from "tamagui";

// export default function TabTwoScreen() {
//   return (
//     <ScrollView
//       width="100%"
//       backgroundColor="$background"
//       maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
//       contentInsetAdjustmentBehavior="never"
//     >
//       <YStack padding="$4" alignItems="center" gap="$4">
//         <Text fontSize={20} color="$blue10">
//           Orchestration
//         </Text>
//         <AddPlayer />
//         <ScoringGrid />
//         <ScoringEntryForm />
//         {/* <ScoringBreakdownGrid /> */}
//       </YStack>
//     </ScrollView>
//   );
// }

// import AddPlayer from "components/features/AddPlayer";
// import ScoringBreakdownGrid from "components/features/GameTotals/ScoringBreakdownGrid";
// import ScoringEntryForm from "components/features/GameTotals/ScoringEntryGrid";
// import ScoringGrid from "components/layout/ScoringGrid";
// import { Text, View, ScrollView, YStack } from "tamagui";
// import { useCallback } from "react";

// export default function TabTwoScreen() {
//   const handleScroll = useCallback((event: any) => {
//     // Prevent default scroll behavior when selecting items
//     event.preventDefault();
//   }, []);

//   return (
//     <ScrollView
//       width="100%"
//       backgroundColor="$background"
//       keyboardShouldPersistTaps="handled"
//       maintainVisibleContentPosition={{
//         minIndexForVisible: 0,
//         autoscrollToTopThreshold: 10,
//       }}
//       contentInsetAdjustmentBehavior="automatic"
//       scrollEventThrottle={16}
//       showsVerticalScrollIndicator={false}
//     >
//       <YStack padding="$4" alignItems="center" gap="$4">
//         <Text fontSize={20} color="$blue10">
//           Orchestration
//         </Text>
//         <AddPlayer />
//         <ScoringGrid />
//         <ScoringEntryForm />
//       </YStack>
//     </ScrollView>
//   );
// }

// import AddPlayer from "components/features/AddPlayer";
// import ScoringBreakdownGrid from "components/features/GameTotals/ScoringBreakdownGrid";
// import ScoringEntryForm from "components/features/GameTotals/ScoringEntryGrid";
// import ScoringGrid from "components/layout/ScoringGrid";
// import { Text, View, ScrollView, YStack } from "tamagui";
// import { KeyboardAvoidingView, Platform } from "react-native";

// export default function TabTwoScreen() {
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
//     >
//       <ScrollView
//         width="100%"
//         backgroundColor="$background"
//         scrollEnabled={true}
//         keyboardShouldPersistTaps="always"
//         keyboardDismissMode="none"
//         contentContainerStyle={{
//           flexGrow: 1,
//         }}
//       >
//         <YStack padding="$4" alignItems="center" gap="$4">
//           <Text fontSize={20} color="$blue10">
//             Orchestration
//           </Text>
//           <AddPlayer />
//           <ScoringGrid />
//           <ScoringEntryForm />
//         </YStack>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

import AddPlayer from "components/features/AddPlayer";
import ScoringBreakdownGrid from "components/features/GameTotals/ScoringBreakdownGrid";
import ScoringEntryForm from "components/features/GameTotals/ScoringEntryGrid";
import ScoringGrid from "components/layout/ScoringGrid";
import { Text, View, ScrollView, YStack } from "tamagui";
import { useRef, useEffect } from "react";

export default function TabTwoScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const lastScrollPosition = useRef(0);

  const handleScroll = (event) => {
    lastScrollPosition.current = event.nativeEvent.contentOffset.y;
  };

  useEffect(() => {
    // Restore scroll position after re-render
    console.log("RERENDERING");
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: lastScrollPosition.current,
        animated: false,
      });
    }
    ``;
  });

  return (
    <ScrollView
      ref={scrollViewRef}
      width="100%"
      backgroundColor="$background"
      onScroll={handleScroll}
      scrollEventThrottle={16}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
        autoscrollToTopThreshold: null,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <YStack padding="$4" alignItems="center" gap="$4">
        <Text fontSize={20} color="$blue10">
          Orchestration
        </Text>
        {/* <AddPlayer /> */}
        <ScoringGrid />
        <ScoringEntryForm />
      </YStack>
    </ScrollView>
  );
}
