import React from "react";
import { usePlayerStore } from "../../../store/usePlayerStore";
import { Button, YStack, XStack } from "tamagui";
import { useToastController } from "@tamagui/toast";

interface ClearStoreButtonProps {
  title?: string;
}

const ClearStoreButton = ({
  title = "Start New Game",
}: ClearStoreButtonProps) => {
  const clearStore = usePlayerStore((state) => state.clearStore);
  const toast = useToastController();

  const handleClearRequest = () => {
    toast.show("Clear All Scores?", {
      message: (
        <XStack gap="$2" jc="flex-end" pt="$2">
          <Button
            size="$2"
            onPress={() => {
              toast.hide();
            }}
            theme="gray"
          >
            Cancel
          </Button>
          <Button
            size="$2"
            onPress={() => {
              clearStore();
              toast.hide();
              toast.show("Game Reset", {
                message: "All scores have been cleared successfully.",
                theme: "green",
                duration: 2000,
              });
            }}
            theme="red"
          >
            Clear
          </Button>
        </XStack>
      ),
      duration: Infinity,
      theme: "orange",
    });
  };

  return (
    <YStack>
      <Button onPress={handleClearRequest} theme="red" size="$4">
        {title}
      </Button>
    </YStack>
  );
};

export default ClearStoreButton;
