import React, { useState, useEffect } from 'react'
import { Input } from 'tamagui'

interface ScoringInputProps {
  value: number
  onScoreChange: (value: string) => void
  disabled?: boolean
  style?: any
}

export function ScoringInput({
  value,
  onScoreChange,
  disabled = false,
  style = {}
}: ScoringInputProps) {
  const [localValue, setLocalValue] = useState(value.toString())

  useEffect(() => {
    setLocalValue(value.toString())
  }, [value])

  const handleChange = (text: string) => {
    // Allow empty string or numbers only
    if (text === '' || /^\d*$/.test(text)) {
      setLocalValue(text)
      onScoreChange(text)
    }
  }

  return (
    <Input
      {...style}
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      value={localValue}
      onChangeText={handleChange}
      disabled={disabled}
    />
  )
}