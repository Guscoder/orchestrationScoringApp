import { BAND_BONUS_VALUES, MUSIC_SELECTIONS, VENUES } from "constants/ScoringVariables"
import { Input, Select, Text, XStack } from "tamagui"

const renderInputField = (category: string, player: typeof players[0]) => {
    // Common input container styles for consistent layout
    const InputContainer = ({ children }: { children: React.ReactNode }) => (
      <XStack 
        width="100%" 
        alignItems="center" 
        justifyContent="center"
        position="relative"
      >
        {children}
      </XStack>
    )
  
    // Common select styles
    const selectStyles = {
      width: "85%",
      height: "$3",
    }
  
    const selectTriggerStyles = {
      backgroundColor: "transparent",
      height: "$3",
      outline: "none",
    }
  
    // Common input styles
    const commonInputStyles = {
      textAlign: "center" as const,
      backgroundColor: "transparent",
      fontSize: "$2",
      height: "$3",
      width: "85%",
      outline: "none",
      borderWidth: 0,
    }
  
    // Common multiplier text styles
    const multiplierStyles = {
      fontSize: "$2",
      color: "$blue10",
      fontWeight: "bold",
      width: "15%",
      textAlign: "center" as const,
      paddingRight: "$1"
    }
  
    // Handle disabled/read-only fields
    if (category === 'venueBonus' || category === 'musicBonus') {
      return (
        <InputContainer>
          <Input
            {...commonInputStyles}
            type="number"
            value={scores[player.id][category].toString()}
            disabled={true}
            backgroundColor="$backgroundHover"
            opacity={1}
          />
        </InputContainer>
      )
    }
  
    // Handle musician rows with multipliers
    if (['musiciansRowOne', 'musiciansRowTwo', 'musiciansRowThree', 'specialtyMusicians'].includes(category)) {
      const multiplier = category === 'musiciansRowTwo' ? 3 
                      : (category === 'musiciansRowThree' || category === 'specialtyMusicians') ? 5 
                      : 1
      
      const displayValue = getDisplayValue(category, scores[player.id][category])
  
      return (
        <InputContainer>
          <Input
            {...commonInputStyles}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={displayValue.toString()}
            onChangeText={(value) => handleScoreChange(player.id, category, value)}
            placeholder="0"
          />
          {multiplier > 1 && (
            <Text
              position="absolute"
              right="$2"
              fontSize="$2"
              color="$blue10"
              fontWeight="bold"
            >
              ×{multiplier}
            </Text>
          )}
        </InputContainer>
      )
    }
  
    // Handle venue selection
    if (category === 'venue') {
      return (
        <InputContainer>
          <Select
            value={venues[player.id] || ''}
            onValueChange={(value) => handleVenueChange(player.id, value)}
            {...selectStyles}
          >
            <Select.Trigger {...selectTriggerStyles}>
              <Select.Value 
                placeholder="Select Venue" 
                fontSize="$2"
                textAlign="center"
              />
            </Select.Trigger>
  
            <Select.Content>
              <Select.Viewport>
                {[1, 2, 3].map(size => (
                  <Select.Group key={size}>
                    <Select.Label padding="$2" color="$blue10">Size {size} Venues</Select.Label>
                    {VENUES.filter(v => v.size === size).map((venue) => (
                      <Select.Item key={venue.name} value={venue.name}>
                        <Select.ItemText>{`${venue.name} (${venue.score} pts)`}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select>
        </InputContainer>
      )
    }
  
    // Handle music selection
    if (category === 'musicSelection') {
      return (
        <InputContainer>
          <Select
            value={musicSelections[player.id] || ''}
            onValueChange={(value) => handleMusicChange(player.id, value)}
            {...selectStyles}
          >
            <Select.Trigger {...selectTriggerStyles}>
              <Select.Value 
                placeholder="Select Music" 
                fontSize="$2"
                textAlign="center"
              />
            </Select.Trigger>
  
            <Select.Content>
              <Select.Viewport>
                {[1, 2, 3].map(size => (
                  <Select.Group key={size}>
                    <Select.Label padding="$2" color="$blue10">Size {size} Music</Select.Label>
                    {MUSIC_SELECTIONS.filter(m => m.size === size).map((music) => (
                      <Select.Item key={music.name} value={music.name}>
                        <Select.ItemText>{`${music.name} (${music.score} pts)`}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select>
        </InputContainer>
      )
    }
  
    // Handle band bonus selection
    if (category === 'bandBonus') {
      return (
        <InputContainer>
          <Select
            value={scores[player.id][category].toString()}
            onValueChange={(value) => handleScoreChange(player.id, category, value)}
            {...selectStyles}
          >
            <Select.Trigger {...selectTriggerStyles}>
            <Select.Value placeholder="Select Band Type" fontSize="$2" />
            </Select.Trigger>
  
            <Select.Content>
              <Select.Viewport>
                {BAND_BONUS_VALUES.map((bonus) => (
                  <Select.Item key={bonus.value} value={bonus.value}>
                    <Select.ItemText>{bonus.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select>
        </InputContainer>
      )
    }
  
    // Default number input for all other fields
    return (
      <InputContainer>
        <Input
          {...commonInputStyles}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={scores[player.id][category].toString()}
          onChangeText={(value) => handleScoreChange(player.id, category, value)}
          placeholder="0"
        />
      </InputContainer>
    )
  }