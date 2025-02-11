import React, { useState } from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Button, Input, YStack, XStack, Checkbox, Text } from 'tamagui';

const AddPlayer: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const addPlayer = usePlayerStore((state) => state.addPlayer);

  const handleAddPlayer = () => {
    if (playerName.trim()) {
      setPlayerNames([...playerNames, playerName]);
      setPlayerName('');
    }
  };

  const handleSubmitAllPlayers = () => {
    playerNames.forEach(name => addPlayer(name));
    setPlayerNames([]);
  };

  return (
    <YStack gap="$2" padding="$4">
      <Input
        value={playerName}
        onChangeText={setPlayerName}
        placeholder="Enter player name"
        width="100%"
      />
      <Button onPress={handleAddPlayer}>Add Player</Button>
      <YStack>
        {playerNames.map((name, index) => (
          <Text key={name}>{name}</Text>
        ))}
      </YStack>
      <Button onPress={handleSubmitAllPlayers}>Submit All Players</Button>
    </YStack>
  );
};

export default AddPlayer;