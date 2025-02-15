// import { XStack, Text, StackProps } from "tamagui";

// interface RoundScoresGridCellProps extends StackProps {
//   children: React.ReactNode;
//   isHighestScore?: boolean;
// }

// export function RoundScoresGridCell({
//   children,
//   isHighestScore = false,
//   ...props
// }: RoundScoresGridCellProps) {
//   return (
//     <XStack
//       alignItems="center"
//       justifyContent="center"
//       padding="$2"
//       minWidth="$6"
//       minHeight="$6"
//       borderWidth={1.5}
//       backgroundColor={isHighestScore ? "$yellow4" : "$background"}
//       hoverStyle={{
//         backgroundColor: isHighestScore ? "$yellow5" : "$backgroundHover",
//       }}
//       {...props}
//     >
//       {typeof children === "string" || typeof children === "number" ? (
//         <Text
//           textAlign="center"
//           fontSize="$4"
//           color="$color"
//           flexWrap="wrap"
//           // Only use numberOfLines for round numbers and scores, not for the title
//           // numberOfLines={
//           //   typeof children === "number" ||
//           //   children === "1" ||
//           //   children === "2" ||
//           //   children === "3" ||
//           //   children === "4" ||
//           //   children === "5"
//           //     ? 1
//           //     : undefined
//           // }
//         >
//           {children}
//         </Text>
//       ) : (
//         <XStack flex={1} width="100%">
//           {children}
//         </XStack>
//       )}
//     </XStack>
//   );
// }

// import { XStack, Text, StackProps } from "tamagui";

// interface RoundScoresGridCellProps extends StackProps {
//   children: React.ReactNode;
//   isHighestScore?: boolean;
// }

// export function RoundScoresGridCell({
//   children,
//   isHighestScore = false,
//   ...props
// }: RoundScoresGridCellProps) {
//   return (
//     <XStack
//       alignItems="center"
//       justifyContent="center"
//       padding="$2"
//       minWidth="$10"
//       minHeight="$6"
//       borderWidth={1.5}
//       backgroundColor={isHighestScore ? "$quatranary" : "$background"}
//       hoverStyle={{
//         backgroundColor: isHighestScore ? "$yellow5" : "$backgroundHover",
//       }}
//       {...props}
//     >
//       {typeof children === "string" || typeof children === "number" ? (
//         <Text
//           textAlign="center"
//           fontSize="$4"
//           color="white"
//           flexWrap="wrap"
//           flex={1}
//           width="100%"
//         >
//           {children}
//         </Text>
//       ) : (
//         <XStack flex={1} width="100%">
//           {children}
//         </XStack>
//       )}
//     </XStack>
//   );
// }

// // RoundScoresGridCell.tsx
// import { XStack, Text, StackProps } from "tamagui";

// interface RoundScoresGridCellProps extends StackProps {
//   children: React.ReactNode;
//   isHighestScore?: boolean;
// }

// export function RoundScoresGridCell({
//   children,
//   isHighestScore = false,
//   ...props
// }: RoundScoresGridCellProps) {
//   return (
//     <XStack
//       alignItems="center"
//       justifyContent="center"
//       padding="$2"
//       minWidth="$10"
//       minHeight="$6"
//       borderWidth={1.5}
//       backgroundColor={isHighestScore ? "$quatranary" : "$background"}
//       hoverStyle={{
//         backgroundColor: isHighestScore ? "$quaternary" : "$backgroundHover",
//       }}
//       {...props}
//     >
//       {typeof children === "string" || typeof children === "number" ? (
//         <Text
//           textAlign="center"
//           fontSize="16px"
//           color={props.backgroundColor === "$primary" ? "white" : "$color"}
//           flexWrap="wrap"
//           flex={1}
//           width="100%"
//         >
//           {children}
//         </Text>
//       ) : (
//         <XStack flex={1} width="100%">
//           {children}
//         </XStack>
//       )}
//     </XStack>
//   );
// }

import { XStack, Text, StackProps } from "tamagui";

interface RoundScoresGridCellProps extends StackProps {
  children: React.ReactNode;
  isHighestScore?: boolean;
}

export function RoundScoresGridCell({
  children,
  isHighestScore = false,
  ...props
}: RoundScoresGridCellProps) {
  return (
    <XStack
      alignItems="center"
      justifyContent="center"
      padding="$2"
      minWidth="$10"
      minHeight="$6"
      borderWidth={1.5}
      backgroundColor={isHighestScore ? "#d79922" : "#d79922"}
      hoverStyle={{
        backgroundColor: isHighestScore ? "$quaternary" : "#d79922",
      }}
      {...props}
    >
      {typeof children === "string" || typeof children === "number" ? (
        <Text
          textAlign="center"
          fontSize="16px"
          color={props.backgroundColor === "#d79922" ? "white" : "white"}
          flexWrap="wrap"
          flex={1}
          width="100%"
          // Add display and alignment properties for better centering
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100%"
        >
          {children}
        </Text>
      ) : (
        <XStack
          flex={1}
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          {children}
        </XStack>
      )}
    </XStack>
  );
}
