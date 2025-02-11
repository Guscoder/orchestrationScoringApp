import React from 'react';
import { XStack } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';

interface CheckboxScoreInputProps {
  value: string;
  onChangeText: (value: string) => void;
}

export default function CheckboxScoreInput({ value, onChangeText }: CheckboxScoreInputProps) {
  const isChecked = parseInt(value, 10) > 0;

  const handleToggle = () => {
    onChangeText(isChecked ? '0' : '5');
  };

  return (
    <XStack 
      width="100%" 
      alignItems="center" 
      justifyContent="center"
      opacity={1}
      pressStyle={{ opacity: 0.8 }}
      onPress={handleToggle}
      cursor="pointer"
    >
      <XStack
        width="$2"
        height="$2"
        borderWidth={1}
        borderColor="$grey"
        borderRadius="$1"
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
      >
        {isChecked && (
          <Check 
            size={32} 
            color="$green8"
            strokeWidth={5}
          />
        )}
      </XStack>
    </XStack>
  );
}