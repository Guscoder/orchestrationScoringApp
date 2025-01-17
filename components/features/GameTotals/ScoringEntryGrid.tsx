import React, { useState } from 'react'
import { YStack, XStack, Select, Button, Input, Text } from 'tamagui'
import { usePlayerStore } from 'store/usePlayerStore'
import { RoundScoresGridCell } from 'components/features/GameTotals/RoundScoresGridCell'
import { PlayerRoundPoints, RoundDetails } from 'store/types'
import { BAND_BONUS_VALUES, BandType, MUSIC_SELECTIONS, scoringCategories, VENUES } from 'constants/ScoringVariables'
import CheckboxScoreInput from './CheckboxScoreInput'



const formatCategoryName = (name: string) => {
  const result = name.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export default function ScoringEntryGrid() {
    const players = usePlayerStore((state) => state.players)
    const updateRoundScoring = usePlayerStore((state) => state.updateRoundScoring)
    const updatePlayerScore = usePlayerStore((state) => state.updatePlayerScore)
    
    const [selectedPlayerId, setSelectedPlayerId] = useState<string>(players[0]?.id || '')

    const [selectedRound, setSelectedRound] = useState(1)
    const [bandTypes, setBandTypes] = useState<Record<string, BandType>>({})
    const [venues, setVenues] = useState<Record<string, string>>({})
    const [musicSelections, setMusicSelections] = useState<Record<string, string>>({})
    const [scores, setScores] = useState<Record<string, Record<string, number>>>(() => {
        // Initialize scores object with 0s for each player and category
        const initialScores: Record<string, Record<string, number>> = {}
        players.forEach(player => {
            initialScores[player.id] = {}
            scoringCategories.forEach(category => {
                initialScores[player.id][category] = 0
            })
        })
        return initialScores
    })

    const getMultipliedValue = (category: string, value: number) => {
        switch(category) {
          case 'musiciansRow2':
            return value * 3;
          case 'musiciansRow3':
            return value * 5;
          default:
            return value;
        }
      }
      
      const getDisplayValue = (category: string, value: number) => {
        switch(category) {
          case 'musiciansRow2':
            return Math.floor(value / 3);
          case 'musiciansRow3':
            return Math.floor(value / 5);
          default:
            return value;
        }
      }

  const handleScoreChange = (playerId: string, category: string, value: string) => {
    const rawValue = parseInt(value) || 0
    const multipliedValue = getMultipliedValue(category, rawValue)
    
    setScores(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [category]: multipliedValue
      }
    }))
  }

  const handleBandTypeChange = (playerId: string, value: BandType) => {
    // Update the band type selection
    setBandTypes(prev => ({
        ...prev,
        [playerId]: value
    }))
    
    // Check if there's a venue selected and recalculate bonus
    const venueName = venues[playerId]
    const venue = VENUES.find(v => v.name === venueName)
    
    if (venue) {
        // Automatically set venue bonus if new band type matches venue bonus
        const awardBonus = venue.bonus === value
        handleScoreChange(playerId, 'venueBonus', awardBonus ? '5' : '0')
    }
}

const renderBandTypeSelect = (player: typeof players[0]) => (
    <Select
        value={bandTypes[player.id] || ''}
        onValueChange={(value) => handleBandTypeChange(player.id, value as BandType)}
    >
        <Select.Trigger width="100%" backgroundColor="transparent">
            <Select.Value placeholder="Select Band Type" fontSize="$2" />
        </Select.Trigger>

        <Select.Content>
            <Select.ScrollUpButton />
            <Select.Viewport>
                {Object.values(BandType).map((bandType) => (
                    <Select.Item key={bandType} value={bandType}>
                        <Select.ItemText>{bandType}</Select.ItemText>
                    </Select.Item>
                ))}
            </Select.Viewport>
            <Select.ScrollDownButton />
        </Select.Content>
    </Select>
)

const handleVenueChange = (playerId: string, venueName: string) => {
    // Update the venue selection
    const venue = VENUES.find(v => v.name === venueName)
    const playerBandType = bandTypes[playerId]
    
    setVenues(prev => ({
        ...prev,
        [playerId]: venueName
    }))
    
    if (venue && playerBandType) {
        // Set the venue score
        handleScoreChange(playerId, 'venue', venue.score.toString())
        
        // Automatically set venue bonus if band type matches
        const awardBonus = venue.bonus === playerBandType
        handleScoreChange(playerId, 'venueBonus', awardBonus ? '5' : '0')
    }
}

const handleMusicChange = (playerId: string, musicName: string) => {
    // Update the music selection
    const music = MUSIC_SELECTIONS.find(m => m.name === musicName)
    const playerBandType = bandTypes[playerId]
    
    setMusicSelections(prev => ({
        ...prev,
        [playerId]: musicName
    }))
    
    if (music && playerBandType) {
        // Set the music score
        handleScoreChange(playerId, 'musicSelection', music.score.toString())
        
        // Automatically set music bonus if band type matches
        const awardBonus = music.bonus === playerBandType
        handleScoreChange(playerId, 'musicBonus', awardBonus ? '5' : '0')
    }
}

const MusicianCountSelect = ({ 
    value,
    onChange,
    multiplier = 1,
    maxCount = 9  // Default to row 1 max
  }) => {
    return (
      <Select
        value={value.toString()}
        onValueChange={(value) => onChange((parseInt(value) * multiplier).toString())}
      >
        <Select.Trigger width="100%" backgroundColor="transparent">
          <Select.Value 
            placeholder="Select Count" 
            fontSize="$2"
          >
            {value > 0 ? Math.floor(value / multiplier) : 'Num of Musicians'}
          </Select.Value>
        </Select.Trigger>
  
        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport>
            {Array.from({length: maxCount + 1}, (_, i) => i).map((num) => (
              <Select.Item 
                key={num} 
                value={num.toString()}
              >
                <Select.ItemText>{num} {num === 1 ? 'Musician' : 'Musicians'}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select>
    )
  }


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
    if (['musiciansRowOne', 'musiciansRowTwo', 'musiciansRowThree', 'specialtyMusicians', 'principalMusicianSecondChair', 'principalMusicianFirstChair'].includes(category)) {
      const multiplier = category === 'musiciansRowTwo' ? 3 
                      : (category === 'musiciansRowThree' || category === 'specialtyMusicians') || category === 'principalMusicianFirstChair' ? 5 : category === 'principalMusicianSecondChair' ? 2
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
          {multiplier > 0 && (
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
  
    // Inside renderInputField function, add this condition before the default return

if (category === 'specialGuest' || category === 'eventManager') {
    return (
      <InputContainer>
        <CheckboxScoreInput
          value={scores[player.id][category]}
          onChange={(value) => handleScoreChange(player.id, category, value)}
          label={category === 'specialGuest' ? 'Has Special Guest' : 'Has Event Manager'}
        />
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
  const handleSubmit = (playerId: string) => {
    const playerScores = scores[playerId]
    const roundKey = `round${selectedRound}` as keyof PlayerRoundPoints

    // Update detailed scoring with current scores and band type
    updateRoundScoring(playerId, roundKey, {
        ...playerScores,
        bandType: bandTypes[playerId] || '', // Need to handle this conversion in the store
        venueName: venues[playerId] || ''
    })

    // Calculate total score
    const totalScore = Object.values(playerScores).reduce((sum, score) => sum + score, 0)
    updatePlayerScore(playerId, roundKey, totalScore)
}


return (
    <YStack 
      width="100%"
      alignItems="center" 
      backgroundColor="$background"
      marginTop="$4"
      padding="$4"
    >
      <YStack 
        width="100%"
        maxWidth={1000}
        gap="$4"
      >
        {/* Scoring Grid */}
        <YStack backgroundColor="$background" borderRadius="$2">
          {/* Round and Player Selection Row */}
          <XStack width="100%">
            <RoundScoresGridCell width="30%">
              <Select
                value={selectedRound.toString()}
                onValueChange={(value) => setSelectedRound(parseInt(value))}
              >
                <Select.Trigger width="100%">
                  <Select.Value placeholder="Select Round" />
                </Select.Trigger>

                <Select.Content>
                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    {[1, 2, 3, 4, 5].map((round) => (
                      <Select.Item key={round} value={round.toString()}>
                        <Select.ItemText>Round {round}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select>
            </RoundScoresGridCell>
            <RoundScoresGridCell width="70%" borderLeftWidth={0}>
              <Select
                value={selectedPlayerId}
                onValueChange={setSelectedPlayerId}
              >
                <Select.Trigger width="100%">
                  <Select.Value placeholder="Select Player" />
                </Select.Trigger>

                <Select.Content>
                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    {players.map((player) => (
                      <Select.Item key={player.id} value={player.id}>
                        <Select.ItemText>{player.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select>
            </RoundScoresGridCell>
          </XStack>

          {/* Scoring Section */}
          {selectedPlayerId && (
            <>
              <XStack width="100%">
                <RoundScoresGridCell width="30%" borderTopWidth={0}>
                  Band Type
                </RoundScoresGridCell>
                <RoundScoresGridCell width="70%" borderLeftWidth={0} borderTopWidth={0}>
                  {renderBandTypeSelect(players.find(p => p.id === selectedPlayerId)!)}
                </RoundScoresGridCell>
              </XStack>

              {scoringCategories.map(category => (
                <XStack key={category} width="100%">
                  <RoundScoresGridCell width="30%" borderTopWidth={0}>
                    {formatCategoryName(category)}
                  </RoundScoresGridCell>
                  <RoundScoresGridCell width="70%" borderLeftWidth={0} borderTopWidth={0}>
                    {renderInputField(category, players.find(p => p.id === selectedPlayerId)!)}
                  </RoundScoresGridCell>
                </XStack>
              ))}

              <XStack width="100%">
                <RoundScoresGridCell width="100%" borderTopWidth={0}>
                  <Button
                    onPress={() => handleSubmit(selectedPlayerId)}
                    backgroundColor="$blue8"
                    color="white"
                    size="$3"
                  >
                    Submit {players.find(p => p.id === selectedPlayerId)?.name}'s Scores
                  </Button>
                </RoundScoresGridCell>
              </XStack>
            </>
          )}
        </YStack>
      </YStack>
    </YStack>
  )
}