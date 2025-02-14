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
      // borderColor="$blue8"
      backgroundColor={isHighestScore ? "$yellow4" : "$background"}
      hoverStyle={{
        backgroundColor: isHighestScore ? "$yellow5" : "$backgroundHover",
      }}
      {...props}
    >
      {typeof children === "string" ? (
        <Text textAlign="center" fontSize="$2" color="$color" flexWrap="wrap">
          {children}
        </Text>
      ) : (
        <XStack flex={1} width="100%">
          {children}
        </XStack>
      )}
    </XStack>
  );
}
