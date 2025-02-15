import AddPlayer from "components/features/AddPlayer";
import ScoringBreakdownGrid from "components/features/GameTotals/ScoringBreakdownGrid";
import ScoringEntryForm from "components/features/GameTotals/ScoringEntryGrid";
import ScoringGrid from "components/layout/ScoringGrid";
import { Text, View, ScrollView, YStack } from "tamagui";
import { useRef, useEffect } from "react";
import ClearStoreButton from "components/features/Scoring/ClearScoreButton";

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
        <Text fontSize={28} color="$blue10">
          Orchestration
        </Text>
        {/* <AddPlayer /> */}
        <ScoringGrid />
        <ClearStoreButton title="Clear Current Scores" />
        <ScoringEntryForm />
      </YStack>
    </ScrollView>
  );
}
