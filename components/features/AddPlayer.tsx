// import React, { useState, useCallback } from "react";
// import { usePlayerStore } from "../../store/usePlayerStore";
// import { Button, Input, YStack, XStack, H2, ScrollView, Stack } from "tamagui";
// import { PlayerEntry } from "./Players/PlayerEntry";
// import { Check } from "@tamagui/lucide-icons";

// const AddPlayer: React.FC = () => {
//   const [playerName, setPlayerName] = useState("");
//   const [playerNames, setPlayerNames] = useState<string[]>([]);
//   const [submittedPlayers, setSubmittedPlayers] = useState<string[]>([]);
//   const addPlayer = usePlayerStore((state) => state.addPlayer);
//   const clearStore = usePlayerStore((state) => state.clearStore);

//   const handleAddPlayer = useCallback(() => {
//     if (playerName.trim()) {
//       setPlayerNames((prev) => [...prev, playerName.trim()]);
//       setPlayerName("");
//     }
//   }, [playerName]);

//   const handleSubmitAllPlayers = useCallback(() => {
//     if (playerNames.length === 0) return;

//     clearStore();
//     playerNames.forEach((name) => {
//       addPlayer(name);
//     });
//     setSubmittedPlayers(playerNames); // Track submitted players
//   }, [playerNames, addPlayer, clearStore]);

//   const handleRemovePlayer = useCallback((name: string) => {
//     setPlayerNames((prev) => prev.filter((player) => player !== name));
//     setSubmittedPlayers((prev) => prev.filter((player) => player !== name));
//   }, []);

//   const handleKeyPress = useCallback(
//     (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === "Enter" && playerName.trim()) {
//         handleAddPlayer();
//       }
//     },
//     [handleAddPlayer, playerName]
//   );

//   const isPlayerSubmitted = (name: string) => submittedPlayers.includes(name);

//   return (
//     <YStack gap="$2" padding="$4" width="100%" maxWidth={500}>
//       <XStack gap="$2">
//         <Input
//           value={playerName}
//           onChangeText={setPlayerName}
//           placeholder="Enter player name"
//           width="100%"
//           onKeyPress={handleKeyPress}
//         />
//         <Button onPress={handleAddPlayer}>Add Player</Button>
//       </XStack>

//       <YStack f={1} maxHeight={400}>
//         <Stack
//           backgroundColor="$blue10"
//           padding="$3"
//           borderTopLeftRadius="$4"
//           borderTopRightRadius="$4"
//         >
//           <H2 fontSize="$6" fontWeight="bold" color="white">
//             Players
//           </H2>
//         </Stack>

//         <ScrollView bounces={false} showsVerticalScrollIndicator={true}>
//           <Stack
//             borderWidth={1}
//             borderColor="$gray5"
//             borderBottomLeftRadius="$4"
//             borderBottomRightRadius="$4"
//           >
//             {playerNames.length === 0 ? (
//               <Stack padding="$4" alignItems="center">
//                 <H2 color="$gray8">No players added yet</H2>
//               </Stack>
//             ) : (
//               playerNames.map((name, index) => (
//                 <Stack
//                   key={`${name}-${index}`}
//                   backgroundColor={index % 2 === 0 ? "$gray3" : "white"}
//                 >
//                   <XStack>
//                     {isPlayerSubmitted(name) && (
//                       <Stack justifyContent="center" paddingLeft="$2">
//                         <Check size="$1" color="$green10" />
//                       </Stack>
//                     )}
//                     <PlayerEntry
//                       playerName={name}
//                       onRemove={handleRemovePlayer}
//                       f={1}
//                     />
//                   </XStack>
//                 </Stack>
//               ))
//             )}
//           </Stack>
//         </ScrollView>
//       </YStack>

//       <Button
//         onPress={handleSubmitAllPlayers}
//         disabled={playerNames.length === 0}
//         opacity={playerNames.length === 0 ? 0.5 : 1}
//         backgroundColor={playerNames.length === 0 ? "$gray8" : "$green8"}
//       >
//         Build Your Band!
//       </Button>
//     </YStack>
//   );
// };
import React, { useState, useCallback } from "react";
import { usePlayerStore } from "../../store/usePlayerStore";
import { Button, Input, YStack, XStack, H2, ScrollView, Stack } from "tamagui";
import { PlayerEntry } from "./Players/PlayerEntry";
import { Check } from "@tamagui/lucide-icons";

const AddPlayer: React.FC = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [submittedPlayers, setSubmittedPlayers] = useState<string[]>([]);
  const addPlayer = usePlayerStore((state) => state.addPlayer);
  const clearStore = usePlayerStore((state) => state.clearStore);

  const handleAddPlayer = useCallback(() => {
    if (playerName.trim()) {
      setPlayerNames((prev) => [...prev, playerName.trim()]);
      setPlayerName("");
    }
  }, [playerName]);

  const handleSubmitAllPlayers = useCallback(() => {
    if (playerNames.length === 0) return;

    clearStore();
    playerNames.forEach((name) => {
      addPlayer(name);
    });
    setSubmittedPlayers(playerNames);
  }, [playerNames, addPlayer, clearStore]);

  const handleRemovePlayer = useCallback((name: string) => {
    setPlayerNames((prev) => prev.filter((player) => player !== name));
    setSubmittedPlayers((prev) => prev.filter((player) => player !== name));
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && playerName.trim()) {
        handleAddPlayer();
      }
    },
    [handleAddPlayer, playerName]
  );

  const isPlayerSubmitted = (name: string) => submittedPlayers.includes(name);

  return (
    <YStack gap="$2" padding="$4" width="100%" maxWidth={500}>
      <XStack gap="$2">
        <Input
          value={playerName}
          onChangeText={setPlayerName}
          placeholder="Enter player name"
          width="100%"
          onKeyPress={handleKeyPress}
          backgroundColor="#c5cbe3"
          fontSize={"$4"}
        />
        <Button
          onPress={handleAddPlayer}
          backgroundColor="#4056a1"
          hoverStyle={{
            backgroundColor: "$quaternary",
          }}
        >
          <Button.Text color="$secondary" fontSize={"$4"}>
            Add Player
          </Button.Text>
        </Button>
      </XStack>

      <YStack f={1} maxHeight={400}>
        <Stack
          backgroundColor="#4056a1"
          padding="$3"
          borderTopLeftRadius="$4"
          borderTopRightRadius="$4"
          borderWidth={1}
          borderColor="$primary"
        >
          <H2 fontSize="$8" fontWeight="bold" color="$background">
            Players
          </H2>
        </Stack>

        <ScrollView bounces={false} showsVerticalScrollIndicator={true}>
          <Stack
            borderWidth={1}
            borderTopWidth={0}
            borderColor="$primary"
            borderBottomLeftRadius="$4"
            borderBottomRightRadius="$4"
            overflow="hidden"
          >
            {playerNames.length === 0 ? (
              <Stack
                padding="$4"
                alignItems="center"
                backgroundColor="$background"
              >
                <H2 fontSize="$4">No players added yet</H2>
              </Stack>
            ) : (
              playerNames.map((name, index) => (
                <Stack
                  key={`${name}-${index}`}
                  backgroundColor={index % 2 === 0 ? "$background" : "#c5cbe3"}
                  borderTopWidth={index > 0 ? 1 : 0}
                  borderTopColor="$primary"
                >
                  <XStack>
                    {isPlayerSubmitted(name) && (
                      <Stack justifyContent="center" paddingLeft="$2">
                        <Check size="$1" color="$success" />
                      </Stack>
                    )}
                    <PlayerEntry
                      playerName={name}
                      onRemove={handleRemovePlayer}
                      f={1}
                    />
                  </XStack>
                </Stack>
              ))
            )}
          </Stack>
        </ScrollView>
      </YStack>

      <Button
        onPress={handleSubmitAllPlayers}
        disabled={playerNames.length === 0}
        opacity={playerNames.length === 0 ? 0.5 : 1}
        backgroundColor="$primary"
        hoverStyle={{
          backgroundColor: "$quaternary",
        }}
      >
        <Button.Text color="$secondary">Build Your Band!</Button.Text>
      </Button>
    </YStack>
  );
};

export default AddPlayer;
