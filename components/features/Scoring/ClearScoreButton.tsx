// import React from "react";
// import { usePlayerStore } from "../../../store/usePlayerStore";
// import { Button, YStack, XStack } from "tamagui";
// import { useToastController } from "@tamagui/toast";

// interface ClearStoreButtonProps {
//   title?: string;
// }

// const ClearStoreButton = ({
//   title = "Start New Game",
// }: ClearStoreButtonProps) => {
//   const clearStore = usePlayerStore((state) => state.clearStore);
//   const toast = useToastController();

//   const handleClearRequest = () => {
//     toast.show("Clear All Scores?", {
//       message: (
//         <XStack gap="$2" jc="flex-end" pt="$2">
//           <Button
//             size="$2"
//             onPress={() => {
//               toast.hide();
//             }}
//             // theme="light"
//           >
//             Cancel
//           </Button>
//           <Button
//             size="$2"
//             onPress={() => {
//               clearStore();
//               toast.hide();
//               toast.show("Game Reset", {
//                 message: "All scores have been cleared successfully.",
//                 // theme: "light",
//                 duration: 2000,
//               });
//             }}
//             // theme="red"
//           >
//             Clear
//           </Button>
//         </XStack>
//       ),
//       duration: Infinity,
//       theme: "orange",
//     });
//   };

//   return (
//     <YStack>
//       <Button onPress={handleClearRequest} theme="red" size="$4">
//         {title}
//       </Button>
//     </YStack>
//   );
// };

// export default ClearStoreButton;

import React from "react";
import { usePlayerStore } from "../../../store/usePlayerStore";
import { Button, YStack, XStack, useTheme } from "tamagui";
import { useToastController } from "@tamagui/toast";

interface ClearStoreButtonProps {
  title?: string;
}

const ClearStoreButton = ({
  title = "Start New Game",
}: ClearStoreButtonProps) => {
  const clearStore = usePlayerStore((state) => state.clearStore);
  const toast = useToastController();
  const theme = useTheme();

  const handleClearRequest = () => {
    toast.show("Clear All Scores?", {
      message: (
        <XStack gap="$2" jc="flex-end" pt="$2">
          <Button
            size="$2"
            onPress={() => {
              toast.hide();
            }}
            backgroundColor="$quaternary"
            color="$background"
            hoverStyle={{
              backgroundColor: "$buttonBackground",
            }}
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
                backgroundColor: "$tertiary",
                color: "$background",
                duration: 2000,
              });
            }}
            backgroundColor="$primary"
            color="$background"
            hoverStyle={{
              backgroundColor: "$quaternary",
            }}
          >
            Clear
          </Button>
        </XStack>
      ),
      duration: Infinity,
      backgroundColor: "$primary",
      color: "$background",
    });
  };

  return (
    <YStack>
      <Button
        onPress={handleClearRequest}
        backgroundColor="$primary"
        color="$background"
        size="$4"
        pressStyle={{
          backgroundColor: "$quaternary",
        }}
        hoverStyle={{
          backgroundColor: "$quaternary",
        }}
      >
        {title}
      </Button>
    </YStack>
  );
};

export default ClearStoreButton;
