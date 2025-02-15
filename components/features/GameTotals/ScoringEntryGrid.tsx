import React, { useRef, useState } from "react";
import {
  YStack,
  XStack,
  Select,
  Button,
  Input,
  Form,
  Text,
  View,
  Sheet,
  ScrollView,
} from "tamagui";
import { usePlayerStore } from "store/usePlayerStore";
import { RoundScoresGridCell } from "components/features/GameTotals/RoundScoresGridCell";
import { PlayerRoundPoints, RoundDetails } from "store/types";
import {
  BAND_BONUS_VALUES,
  BandType,
  MUSIC_SELECTIONS,
  scoringCategories,
  VENUES,
} from "constants/ScoringVariables";
import CheckboxScoreInput from "./CheckboxScoreInput";

const SubmitButtonSection = () => {
  return (
    <XStack width="100%">
      <RoundScoresGridCell width="100%" borderTopWidth={0}>
        <XStack width="100%" justifyContent="center">
          <Form.Trigger asChild>
            <Button backgroundColor="$primary" color="$tertiary" size="$4">
              Submit Scores
            </Button>
          </Form.Trigger>
        </XStack>
      </RoundScoresGridCell>
    </XStack>
  );
};

interface SelectWrapperProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

const SelectWrapper = ({
  children,
  value,
  onValueChange,
  placeholder,
}: SelectWrapperProps) => {
  const [position, setPosition] = useState(0);
  const [open, setOpen] = useState(false);

  const handleValueChange = (newValue: string) => {
    requestAnimationFrame(() => {
      onValueChange(newValue);
      setOpen(false);
    });
  };

  return (
    <Select
      value={value}
      onValueChange={handleValueChange}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Trigger width="100%" backgroundColor="transparent">
        <Select.Value
          placeholder={placeholder}
          fontSize="$4"
          width="100%"
          flex={1}
          textAlign="center"
        />
      </Select.Trigger>

      <Select.Adapt when="sm">
        <Sheet
          modal
          open={open}
          onOpenChange={setOpen}
          snapPoints={[80]}
          position={position}
          onPositionChange={setPosition}
          dismissOnSnapToBottom
        >
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            <XStack width="100%" paddingHorizontal="$4">
              <YStack
                width="100%"
                backgroundColor="$background"
                borderRadius="$4"
                marginTop="$4"
                maxHeight="80vh"
                overflow="hidden"
              >
                <Sheet.ScrollView
                  showsVerticalScrollIndicator={true}
                  showsHorizontalScrollIndicator={false}
                  padding="$2"
                  bounces={false}
                >
                  <YStack space="$1">{children}</YStack>
                </Sheet.ScrollView>
              </YStack>
            </XStack>
          </Sheet.Frame>
        </Sheet>
      </Select.Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <YStack space="$1">{children}</YStack>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );
};

const formatCategoryName = (name: string) => {
  const result = name.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

interface FormData {
  playerId: string;
  round: number;
  bandType: BandType | "";
  venue: string;
  musicSelection: string;
  scores: Record<string, string>;
  bandBonus: string;
}

interface AudioTracks {
  [key: string]: HTMLAudioElement | null;
}

export default function ScoringEntryForm() {
  const players = usePlayerStore((state) => state.players);
  const updateRoundScoring = usePlayerStore(
    (state) => state.updateRoundScoring
  );
  const updatePlayerScore = usePlayerStore((state) => state.updatePlayerScore);

  const audioRefs = useRef<AudioTracks>({
    greenonions: null,
    jupiter: null,
    rockandrollpart2: null,
    fanfareforcommonman: null,
  });

  React.useEffect(() => {
    // Initialize audio elements
    audioRefs.current.rockandrollpart2 = new Audio(
      "../../assets/music/rockandrollpart2.mp3"
    );
    audioRefs.current.fanfareforcommonman = new Audio(
      "../../assets/music/fanfareforcommonman.mp3"
    );
    audioRefs.current.greenonions = new Audio(
      "../../assets/music/greenonions.mp3"
    );
    audioRefs.current.jupiter = new Audio("../../assets/music/jupiter.mp3");

    return () => {
      // Cleanup
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  const initialFormData: FormData = {
    playerId: players[0]?.id || "",
    round: 1,
    bandType: "",
    venue: "",
    musicSelection: "",
    scores: scoringCategories.reduce((acc, category) => {
      acc[category] = "";
      return acc;
    }, {} as Record<string, string>),
    bandBonus: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (field: keyof FormData | string, value: string) => {
    if (
      field === "playerId" ||
      field === "round" ||
      field === "bandType" ||
      // field === "venue" ||
      field === "musicSelection"
    ) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        scores: {
          ...prev.scores,
          [field]: value,
        },
      }));
    }
  };

  const handleBandTypeChange = (value: BandType) => {
    const venue = VENUES.find((v) => formData.venue === v.name);
    const music = MUSIC_SELECTIONS.find(
      (m) => formData.musicSelection === m.name
    );

    setFormData((prev) => ({
      ...prev,
      bandType: value,
      scores: {
        ...prev.scores,
        venueBonus: value === venue?.bonus ? "5" : "0",
        musicBonus: value === music?.bonus ? "5" : "0",
      },
    }));
  };

  const handleVenueChange = (value: string) => {
    const venue = VENUES.find((v) => v.name === value);

    setFormData((prev) => ({
      ...prev,
      venue: value,
      scores: {
        ...prev.scores,
        venue: venue?.score.toString() || "0",
        venueBonus: venue?.bonus === prev.bandType ? "5" : "0",
      },
    }));
  };

  const handleMusicChange = (value: string) => {
    const music = MUSIC_SELECTIONS.find((m) => m.name === value);
    // Stop any currently playing track
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // Play the new selection if it's either Green Onions or Jupiter
    if (
      value === "Green Onions" ||
      value === "Jupiter" ||
      value === "Rock and Roll Part 2" ||
      value === "Fanfare for Common Man"
    ) {
      const audio = audioRefs.current[value.toLowerCase().replace(/ /g, "")];
      if (audio) {
        audio.currentTime = 0; // Reset to start
        audio.play();
      }
    }

    setFormData((prev) => ({
      ...prev,
      musicSelection: value,
      scores: {
        ...prev.scores,
        musicSelection: music?.score.toString() || "0",
        musicBonus: music?.bonus === prev.bandType ? "5" : "0",
      },
    }));
  };

  const handleSubmit = () => {
    const { playerId, round, scores } = formData;
    const roundKey = `round${round}` as keyof PlayerRoundPoints;

    // Convert scores to numbers and apply multipliers
    const numericScores = Object.entries(scores).reduce(
      (acc, [category, value]) => {
        let numValue = value === "" ? 0 : parseInt(value);

        // Apply multipliers
        if (category === "musiciansRowTwo") numValue *= 3;
        if (
          category === "musiciansRowThree" ||
          category === "specialtyMusicians"
        )
          numValue *= 5;
        if (category === "principalMusicianSecondChair") numValue *= 2;
        if (category === "principalMusicianFirstChair") numValue *= 5;

        acc[category] = numValue;
        return acc;
      },
      {} as Record<string, number>
    );

    // Update store
    updateRoundScoring(playerId, roundKey, {
      ...numericScores,
      bandType: formData.bandType,
    });

    const totalScore = Object.values(numericScores).reduce(
      (sum, score) => sum + score,
      0
    );
    updatePlayerScore(playerId, roundKey, totalScore);

    // Reset form
    setFormData(initialFormData);
  };

  const renderInputField = (category: string) => {
    const commonInputProps = {
      type: "number",
      inputMode: "numeric" as const,
      pattern: "[0-9]*",
      value: formData.scores[category],
      onChangeText: (value: string) => handleInputChange(category, value),
      textAlign: "center" as const,
      borderWidth: 0,
      backgroundColor: "$tertiary",
      fontSize: "$4",
      height: "$3",
      width: "100%",
      focusStyle: {
        outline: "none",
        boxShadow: "none",
      },
    };

    if (category === "venueBonus" || category === "musicBonus") {
      return (
        <Input
          {...commonInputProps}
          disabled={true}
          backgroundColor={"$tertiary"}
          opacity={1}
          placeholder="0"
        />
      );
    }

    // Handle special selects
    if (category === "venue") {
      return (
        <SelectWrapper
          value={formData.venue}
          onValueChange={handleVenueChange}
          placeholder="Select Venue"
        >
          {[1, 2, 3].map((size) => (
            <Select.Group key={size}>
              <YStack width="100%" alignItems="center" paddingVertical="$2">
                <Select.Label
                  fontWeight="bold"
                  fontSize="$6"
                  textAlign="center"
                  backgroundColor={"$secondary"}
                >
                  {`Size ${size} Venues`}
                </Select.Label>
              </YStack>
              {VENUES.filter((v) => v.size === size).map((venue) => (
                <Select.Item
                  key={venue.name}
                  value={venue.name}
                  index={VENUES.findIndex((v) => v.name === venue.name)}
                  onPress={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Select.ItemText
                    textAlign="center"
                    width="100%"
                    fontSize={"$4"}
                  >
                    {`${venue.name} (${venue.score} pts)`}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          ))}
        </SelectWrapper>
      );
    }
    if (category === "bandBonus") {
      return (
        <SelectWrapper
          value={formData.bandBonus}
          onValueChange={(value) => handleInputChange("bandBonus", value)}
          placeholder="Band Bonus"
        >
          <Select.Group>
            <YStack width="100%" alignItems="center" paddingVertical="$2">
              <Select.Label
                fontWeight="bold"
                fontSize="$6"
                textAlign="center"
                backgroundColor={"$secondary"}
              >
                Band Bonuses
              </Select.Label>
            </YStack>
            {BAND_BONUS_VALUES.map((bonus, index) => (
              <Select.Item
                key={bonus.value}
                value={bonus.value}
                index={index}
                onPress={(e) => {
                  e.stopPropagation();
                }}
              >
                <Select.ItemText
                  textAlign="center"
                  width="100%"
                  fontSize={"$4"}
                >
                  {bonus.label}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </SelectWrapper>
      );
    }

    if (category === "musicSelection") {
      return (
        <SelectWrapper
          value={formData.musicSelection}
          onValueChange={handleMusicChange}
          placeholder="Select Music"
        >
          {[1, 2, 3].map((size) => (
            <Select.Group key={size}>
              <YStack width="100%" alignItems="center">
                <Select.Label
                  fontWeight="bold"
                  fontSize="$6"
                  textAlign="center"
                  backgroundColor="$secondary"
                >
                  {`Size ${size} Music`}
                </Select.Label>
              </YStack>
              {MUSIC_SELECTIONS.filter((m) => m.size === size).map((music) => (
                <Select.Item
                  key={music.name}
                  value={music.name}
                  index={MUSIC_SELECTIONS.findIndex(
                    (m) => m.name === music.name
                  )}
                  onPress={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Select.ItemText
                    textAlign="center"
                    width="100%"
                    fontSize={"$4"}
                  >
                    {`${music.name} (${music.score} pts)`}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          ))}
        </SelectWrapper>
      );
    }

    if (
      [
        "musiciansRowOne",
        "musiciansRowTwo",
        "musiciansRowThree",
        "specialtyMusicians",
        "principalMusicianSecondChair",
        "principalMusicianFirstChair",
      ].includes(category)
    ) {
      const multiplier =
        category === "musiciansRowTwo"
          ? 3
          : category === "musiciansRowOne"
          ? 1
          : category === "musiciansRowThree" ||
            category === "specialtyMusicians" ||
            category === "principalMusicianFirstChair"
          ? 5
          : category === "principalMusicianSecondChair"
          ? 2
          : 1;

      return (
        <XStack
          key={category}
          width="100%"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Input
            {...commonInputProps}
            placeholder="0"
            maxWidth="50%"
            backgroundColor={"$tertiary"}
          />
          {multiplier > 0 && (
            <Text
              position="absolute"
              left="58%"
              fontSize="$4"
              color="$quaternary"
              fontWeight="bold"
            >
              ×{multiplier}
            </Text>
          )}
        </XStack>
      );
    }

    if (category === "specialGuest" || category === "eventManager") {
      return <CheckboxScoreInput {...commonInputProps} />;
    }

    // Default number input
    return <Input {...commonInputProps} placeholder="0" />;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <YStack
        width="100%"
        alignItems="center"
        backgroundColor="$background"
        minWidth={"96vw"}
      >
        <YStack
          width="100%"
          maxWidth={865}
          // minWidth={"100vw"}
          gap="$4"
        >
          <YStack backgroundColor="#d79922" borderRadius="$2">
            {/* Header Row with Round and Player Selection */}
            <XStack
              width="100%"
              position="relative"
              backgroundColor={"$secondary"}
            >
              <RoundScoresGridCell
                width="30%"
                backgroundColor={"$secondary"}
                borderColor={"$background"}
                borderLeftColor={"$primary"}
                borderTopColor={"$primary"}
              >
                <SelectWrapper
                  value={formData.round.toString()}
                  onValueChange={(value) => handleInputChange("round", value)}
                  placeholder="Select Round"
                >
                  <Select.Group>
                    <YStack
                      width="100%"
                      alignItems="center"
                      paddingVertical="$2"
                    >
                      <Select.Label
                        fontWeight="bold"
                        fontSize="$6"
                        textAlign="center"
                        backgroundColor="$secondary"
                      >
                        Game Rounds
                      </Select.Label>
                    </YStack>
                    {[1, 2, 3, 4, 5].map((round) => (
                      <Select.Item
                        key={round}
                        value={round.toString()}
                        onPress={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Select.ItemText
                          textAlign="center"
                          width="100%"
                          fontSize="$4"
                        >
                          Round {round}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </SelectWrapper>
              </RoundScoresGridCell>

              {/* Player Selector */}
              <RoundScoresGridCell
                width="70%"
                borderLeftWidth={0}
                backgroundColor={"$secondary"}
              >
                <SelectWrapper
                  value={formData.playerId}
                  onValueChange={(value) =>
                    handleInputChange("playerId", value)
                  }
                  placeholder="Select Player"
                >
                  <Select.Group>
                    <YStack
                      width="100%"
                      alignItems="center"
                      paddingVertical="$2"
                    >
                      <Select.Label
                        fontWeight="bold"
                        fontSize="$6"
                        textAlign="center"
                        backgroundColor="$secondary"
                      >
                        Players
                      </Select.Label>
                    </YStack>
                    {players.map((player) => (
                      <Select.Item
                        key={player.id}
                        value={player.id}
                        onPress={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Select.ItemText
                          textAlign="center"
                          width="100%"
                          fontSize="$6"
                        >
                          {player.name}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </SelectWrapper>
              </RoundScoresGridCell>
            </XStack>

            {/* Band Type Row */}
            <XStack width="100%" position="relative">
              <RoundScoresGridCell
                width="30%"
                borderTopWidth={0}
                backgroundColor={"$primary"}
                borderColor={"$background"}
              >
                Band Type
              </RoundScoresGridCell>
              <RoundScoresGridCell
                width="70%"
                borderLeftWidth={0}
                borderTopWidth={0}
                backgroundColor={"$tertiary"}
              >
                <SelectWrapper
                  value={formData.bandType}
                  onValueChange={(value) =>
                    handleBandTypeChange(value as BandType)
                  }
                  placeholder="Select Band Type"
                >
                  <Select.Group>
                    <YStack
                      width="100%"
                      alignItems="center"
                      paddingVertical="$2"
                    >
                      <Select.Label
                        fontWeight="bold"
                        fontSize="$6"
                        textAlign="center"
                        backgroundColor="$secondary"
                      >
                        Band Type
                      </Select.Label>
                    </YStack>
                    {Object.values(BandType).map((type) => (
                      <Select.Item
                        key={type}
                        value={type}
                        onPress={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Select.ItemText
                          textAlign="center"
                          width="100%"
                          fontSize="$6"
                        >
                          {type}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </SelectWrapper>
              </RoundScoresGridCell>
            </XStack>

            {/* Scoring Categories */}
            {scoringCategories.map((category) => (
              <XStack key={category} width="100%" position="relative">
                <RoundScoresGridCell
                  width="30%"
                  borderTopWidth={0}
                  backgroundColor={"$primary"}
                  borderColor={"$background"}
                >
                  {formatCategoryName(category)}
                </RoundScoresGridCell>
                <RoundScoresGridCell
                  width="70%"
                  borderLeftWidth={0}
                  borderTopWidth={0}
                  backgroundColor={"$tertiary"}
                  borderColor={"$primary"}
                >
                  {renderInputField(category)}
                </RoundScoresGridCell>
              </XStack>
            ))}

            {/* Submit Button */}
            <SubmitButtonSection />
          </YStack>
        </YStack>
      </YStack>
    </Form>
  );
}
