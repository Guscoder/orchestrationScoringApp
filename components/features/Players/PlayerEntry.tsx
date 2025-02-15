// import { XStack, Text, StackProps, Button } from "tamagui";
// import { X } from "@tamagui/lucide-icons";

// interface PlayerEntry extends StackProps {
//   playerName: string;
//   onRemove?: (name: string) => void;
// }

// export function PlayerEntry({ playerName, onRemove, ...props }: PlayerEntry) {
//   return (
//     <XStack
//       alignItems="center"
//       justifyContent="space-between"
//       padding="$2"
//       minWidth="$6"
//       minHeight="$4"
//       {...props}
//     >
//       <Text textAlign="center" fontSize="$4" color="$color" flexWrap="wrap">
//         {playerName}
//       </Text>
//       {onRemove && (
//         <Button
//           size="$2"
//           padding="$1"
//           backgroundColor="transparent"
//           onPress={() => onRemove(playerName)}
//           pressStyle={{ backgroundColor: "black" }}
//           hoverStyle={{ backgroundColor: "black" }}
//         >
//           <X size="$1" color="$red10" />
//         </Button>
//       )}
//     </XStack>
//   );
// }

// PlayerEntry.tsx
import { XStack, Text, StackProps, Button } from "tamagui";
import { X } from "@tamagui/lucide-icons";

interface PlayerEntry extends StackProps {
  playerName: string;
  onRemove?: (name: string) => void;
}

export function PlayerEntry({ playerName, onRemove, ...props }: PlayerEntry) {
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      padding="$2"
      minWidth="$6"
      minHeight="$4"
      {...props}
    >
      <Text textAlign="center" fontSize="$4" color="$text" flexWrap="wrap">
        {playerName}
      </Text>
      {onRemove && (
        <Button
          size="$2"
          padding="$1"
          backgroundColor="transparent"
          onPress={() => onRemove(playerName)}
          pressStyle={{ backgroundColor: "$quaternary" }}
          hoverStyle={{ backgroundColor: "$quaternary" }}
        >
          <X size="$1" color="$red10" />
        </Button>
      )}
    </XStack>
  );
}
