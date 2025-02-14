import React, { useState, useCallback } from "react";
import { usePlayerStore } from "../../store/usePlayerStore";
import { Button, Input, YStack, XStack, H2, ScrollView } from "tamagui";
import { PlayerEntry } from "./Players/PlayerEntry";

const AddPlayer: React.FC = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerNames, setPlayerNames] = useState<string[]>([]);
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

    // Clear the store first
    clearStore();

    // Add each player
    playerNames.forEach((name) => {
      addPlayer(name);
    });

    // Clear local state
    setPlayerNames([]);
  }, [playerNames, addPlayer, clearStore]);

  const handleRemovePlayer = useCallback((name: string) => {
    setPlayerNames((prev) => prev.filter((player) => player !== name));
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && playerName.trim()) {
        handleAddPlayer();
      }
    },
    [handleAddPlayer, playerName]
  );

  return (
    <YStack gap="$2" padding="$4" width="100%" maxWidth={500}>
      <XStack gap="$2">
        <Input
          value={playerName}
          onChangeText={setPlayerName}
          placeholder="Enter player name"
          width="100%"
          onKeyPress={handleKeyPress}
        />
        <Button onPress={handleAddPlayer}>Add Player</Button>
      </XStack>

      <YStack f={1} maxHeight={400}>
        <H2 fontSize="$6" fontWeight="bold" color="$color" marginBottom="$2">
          Players
        </H2>
        <ScrollView bounces={false} showsVerticalScrollIndicator={true}>
          <YStack gap="$2">
            {playerNames.map((name, index) => (
              <PlayerEntry
                key={`${name}-${index}`}
                playerName={name}
                onRemove={handleRemovePlayer}
              />
            ))}
          </YStack>
        </ScrollView>
      </YStack>

      <Button
        onPress={handleSubmitAllPlayers}
        disabled={playerNames.length === 0}
        opacity={playerNames.length === 0 ? 0.5 : 1}
      >
        Build Your Band!
      </Button>
    </YStack>
  );
};

export default AddPlayer;
