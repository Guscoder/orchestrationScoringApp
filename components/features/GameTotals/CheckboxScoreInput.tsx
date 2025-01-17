import React from 'react';
import { XStack } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';

interface CheckboxScoreInputProps {
  value: number;
  onChange: (value: string) => void;
}

export default function CheckboxScoreInput({ value, onChange }: CheckboxScoreInputProps) {
  const isChecked = value > 0;

  const handleToggle = () => {
    onChange(isChecked ? '0' : '5');
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
        borderColor="$black"
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