import React, { useState } from "react";
import {
  YStack,
  XStack,
  Select,
  Button,
  Input,
  Form,
  Text,
  View,
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

interface SelectWrapperProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

export const SelectWrapper = ({
  children,
  value,
  onValueChange,
  placeholder,
  ...props
}: SelectWrapperProps) => {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        // Prevent default scroll behavior
        requestAnimationFrame(() => {
          onValueChange(value);
        });
      }}
      {...props}
    >
      <Select.Trigger width="100%" backgroundColor="transparent">
        <Select.Value
          placeholder={placeholder}
          fontSize="$2"
          width="100%"
          flex={1}
        />
      </Select.Trigger>
      <Select.Adapt when="sm">
        <Select.Sheet modal dismissOnSnapToBottom>
          <Select.Sheet.Frame>
            <Select.Sheet.ScrollView>
              <Select.Viewport>{children}</Select.Viewport>
            </Select.Sheet.ScrollView>
          </Select.Sheet.Frame>
          <Select.Sheet.Overlay />
        </Select.Sheet>
      </Select.Adapt>
      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport
          enterStyle={{ opacity: 0, scale: 0.95, y: -10 }}
          exitStyle={{ opacity: 0, scale: 0.95, y: 10 }}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          {children}
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

export default function ScoringEntryForm() {
  const players = usePlayerStore((state) => state.players);
  const updateRoundScoring = usePlayerStore(
    (state) => state.updateRoundScoring
  );
  const updatePlayerScore = usePlayerStore((state) => state.updatePlayerScore);

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
      field === "venue" ||
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

  const renderSelect = (
    placeholder: string,
    value: string,
    onChange: (value: string) => void,
    options: { label: string; value: string }[]
  ) => (
    <Select value={value} onValueChange={onChange}>
      <Select.Trigger width="100%" backgroundColor="transparent">
        <Select.Value
          placeholder={placeholder}
          fontSize="$2"
          width="100%"
          flex={1}
        />
      </Select.Trigger>
      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          {options.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              <Select.ItemText>{option.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );

  const renderInputField = (category: string) => {
    const commonInputProps = {
      type: "number",
      inputMode: "numeric" as const,
      pattern: "[0-9]*",
      value: formData.scores[category],
      onChangeText: (value: string) => handleInputChange(category, value),
      textAlign: "center" as const,
      borderWidth: 0,
      backgroundColor: "transparent",
      fontSize: "$2",
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
          backgroundColor="$backgroundHover"
          opacity={1}
        />
      );
    }

    // Handle special selects
    if (category === "venue") {
      return (
        // <Select value={formData.venue} onValueChange={handleVenueChange}>
        //   <Select.Trigger width="100%" backgroundColor="transparent">
        //     <Select.Value
        //       placeholder="Select Venue"
        //       fontSize="$2"
        //       width="100%"
        //       flex={1}
        //     />
        //   </Select.Trigger>
        //   <View position="relative">
        //     <Select.Content>
        //       <View
        //         maxWidth="90vw"
        //         position="absolute"
        //         top="100%"
        //         left="0"
        //         right="0"
        //         zIndex={1000}
        //       >
        //         <Select.ScrollUpButton />
        //         <Select.Viewport>
        //           {[1, 2, 3].map((size) => (
        //             <Select.Group key={size}>
        //               <Select.Label>Size {size} Venues</Select.Label>
        //               {VENUES.filter((v) => v.size === size).map((venue) => (
        //                 <Select.Item
        //                   key={venue.name}
        //                   value={venue.name}
        //                   index={VENUES.findIndex((v) => v.name === venue.name)}
        //                 >
        //                   <Select.ItemText>{`${venue.name} (${venue.score} pts)`}</Select.ItemText>
        //                 </Select.Item>
        //               ))}
        //             </Select.Group>
        //           ))}
        //         </Select.Viewport>
        //         <Select.ScrollDownButton />
        //       </View>
        //     </Select.Content>
        //   </View>
        // </Select>
        <SelectWrapper
          value={formData.venue}
          onValueChange={handleVenueChange}
          placeholder="Select Venue"
        >
          {[1, 2, 3].map((size) => (
            <Select.Group key={size}>
              <Select.Label>Size {size} Venues</Select.Label>
              {VENUES.filter((v) => v.size === size).map((venue) => (
                <Select.Item
                  key={venue.name}
                  value={venue.name}
                  index={VENUES.findIndex((v) => v.name === venue.name)}
                >
                  <Select.ItemText>{`${venue.name} (${venue.score} pts)`}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          ))}
        </SelectWrapper>
      );
    }
    if (category === "bandBonus") {
      return (
        // <Select
        //   value={formData.bandBonus}
        //   onValueChange={(value) => handleInputChange("bandBonus", value)}
        // >
        //   <Select.Trigger width="100%" backgroundColor="transparent">
        //     <Select.Value
        //       placeholder="Band Bonus"
        //       fontSize="$2"
        //       width="100%"
        //       flex={1}
        //     />
        //   </Select.Trigger>
        //   <Select.Content>
        //     <Select.ScrollUpButton />
        //     <Select.Viewport>
        //       {BAND_BONUS_VALUES.map((bonus, index) => (
        //         <Select.Item
        //           key={bonus.value}
        //           value={bonus.value}
        //           index={index}
        //         >
        //           <Select.ItemText>{bonus.label}</Select.ItemText>
        //         </Select.Item>
        //       ))}
        //     </Select.Viewport>
        //     <Select.ScrollDownButton />
        //   </Select.Content>
        // </Select>
        <SelectWrapper
          value={formData.bandBonus}
          onValueChange={(value) => handleInputChange("bandBonus", value)}
          placeholder="Band Bonus"
        >
          {BAND_BONUS_VALUES.map((bonus, index) => (
            <Select.Item key={bonus.value} value={bonus.value} index={index}>
              <Select.ItemText>{bonus.label}</Select.ItemText>
            </Select.Item>
          ))}
        </SelectWrapper>
      );
    }

    if (category === "musicSelection") {
      return (
        // <Select
        //   value={formData.musicSelection}
        //   onValueChange={handleMusicChange}
        // >
        //   <Select.Trigger width="100%" backgroundColor="transparent">
        //     <Select.Value
        //       placeholder="Select Music"
        //       fontSize="$2"
        //       width="100%"
        //       flex={1}
        //     />
        //   </Select.Trigger>
        //   <Select.Content>
        //     <Select.ScrollUpButton />
        //     <Select.Viewport>
        //       {[1, 2, 3].map((size) => (
        //         <Select.Group key={size}>
        //           <Select.Label>Size {size} Venues</Select.Label>
        //           {MUSIC_SELECTIONS.filter((m) => m.size === size).map(
        //             (music) => (
        //               <Select.Item
        //                 key={music.name}
        //                 value={music.name}
        //                 index={MUSIC_SELECTIONS.findIndex(
        //                   (m) => m.name === music.name
        //                 )}
        //               >
        //                 <Select.ItemText>{`${music.name} (${music.score} pts)`}</Select.ItemText>
        //               </Select.Item>
        //             )
        //           )}
        //         </Select.Group>
        //       ))}
        //     </Select.Viewport>
        //     <Select.ScrollDownButton />
        //   </Select.Content>
        // </Select>
        <SelectWrapper
          value={formData.musicSelection}
          onValueChange={handleMusicChange}
          placeholder="Select Music"
        >
          {[1, 2, 3].map((size) => (
            <Select.Group key={size}>
              <Select.Label>Size {size} Music</Select.Label>
              {MUSIC_SELECTIONS.filter((m) => m.size === size).map((music) => (
                <Select.Item
                  key={music.name}
                  value={music.name}
                  index={MUSIC_SELECTIONS.findIndex(
                    (m) => m.name === music.name
                  )}
                >
                  <Select.ItemText>{`${music.name} (${music.score} pts)`}</Select.ItemText>
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
        <XStack key={category} width="100%" alignItems="center">
          <Input {...commonInputProps} placeholder="0" />
          {multiplier > 0 && (
            <Text
              position="absolute"
              right="$2"
              fontSize="$2"
              color="$blue10"
              fontWeight="bold"
              textAlign="left"
              width="auto"
            >
              ×{multiplier}
            </Text>
          )}
        </XStack>
        //   <XStack key={category} width="100%" alignItems="center">
        //   <Input {...commonInputProps} placeholder="0" />
        //   {multiplier > 0 && (
        //   <Text
        //     position="absolute"
        //     right="$2"
        //     fontSize="$2"
        //     color="$blue10"
        //     fontWeight="bold"
        //     textAlign="right"
        //     width="auto"
        //   >
        //     ×{multiplier}
        //   </Text>
        //   )}
        // </XStack>
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
        marginTop="$4"
        padding="$4"
      >
        <YStack
          width="100%"
          maxWidth={1000}
          minWidth={"100vw"}
          gap="$4"
          padding={"$2"}
        >
          <YStack backgroundColor="$background" borderRadius="$2">
            {/* Header Row with Round and Player Selection */}
            <XStack width="100%" position="relative">
              <RoundScoresGridCell width="30%">
                {/* <Select
                  value={formData.round.toString()}
                  onValueChange={(value) => handleInputChange("round", value)}
                >
                  <Select.Trigger
                    width="100%"
                    flex={1}
                    backgroundColor="transparent"
                  >
                    <Select.Value
                      placeholder="Select Round"
                      width="100%"
                      textAlign="center"
                      flex={1}
                    />
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
                </Select> */}
                <SelectWrapper
                  value={formData.round.toString()}
                  onValueChange={(value) => handleInputChange("round", value)}
                  placeholder="Select Round"
                >
                  {[1, 2, 3, 4, 5].map((round) => (
                    <Select.Item key={round} value={round.toString()}>
                      <Select.ItemText>Round {round}</Select.ItemText>
                    </Select.Item>
                  ))}
                </SelectWrapper>
              </RoundScoresGridCell>

              {/* Player Selector */}
              <RoundScoresGridCell width="70%" borderLeftWidth={0}>
                {/* <Select
                  value={formData.playerId}
                  onValueChange={(value) =>
                    handleInputChange("playerId", value)
                  }
                >
                  <Select.Trigger
                    width="100%"
                    flex={1}
                    backgroundColor="transparent"
                  >
                    <Select.Value
                      placeholder="Select Player"
                      fontSize="$2"
                      textAlign="center"
                      width="100%"
                      flex={1}
                    />
                  </Select.Trigger>
                  <Select.Content zIndex={1000}>
                    <Select.ScrollUpButton />
                    <Select.Viewport backgroundColor="$background">
                      {players.map((player) => (
                        <Select.Item key={player.id} value={player.id}>
                          <Select.ItemText>{player.name}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select> */}
                <SelectWrapper
                  value={formData.playerId}
                  onValueChange={(value) =>
                    handleInputChange("playerId", value)
                  }
                  placeholder="Select Player"
                >
                  {players.map((player) => (
                    <Select.Item key={player.id} value={player.id}>
                      <Select.ItemText>{player.name}</Select.ItemText>
                    </Select.Item>
                  ))}
                </SelectWrapper>
              </RoundScoresGridCell>
            </XStack>

            {/* Band Type Row */}
            <XStack width="100%" position="relative">
              <RoundScoresGridCell width="30%" borderTopWidth={0}>
                Band Type
              </RoundScoresGridCell>
              <RoundScoresGridCell
                width="70%"
                borderLeftWidth={0}
                borderTopWidth={0}
              >
                <Select
                  value={formData.bandType}
                  onValueChange={(value) =>
                    handleInputChange("bandType", value)
                  }
                >
                  <Select.Trigger width="100%" backgroundColor="transparent">
                    <Select.Value
                      placeholder="Select Band Type"
                      fontSize="$2"
                      width="100%"
                      flex={1}
                    />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      {Object.values(BandType).map((type) => (
                        <Select.Item key={type} value={type}>
                          <Select.ItemText>{type}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              </RoundScoresGridCell>
            </XStack>

            {/* Scoring Categories */}
            {scoringCategories.map((category) => (
              <XStack key={category} width="100%" position="relative">
                <RoundScoresGridCell width="30%" borderTopWidth={0}>
                  {formatCategoryName(category)}
                </RoundScoresGridCell>
                <RoundScoresGridCell
                  width="70%"
                  borderLeftWidth={0}
                  borderTopWidth={0}
                >
                  {renderInputField(category)}
                </RoundScoresGridCell>
              </XStack>
            ))}

            {/* Submit Button */}
            <XStack width="100%">
              <RoundScoresGridCell width="100%" borderTopWidth={0}>
                <Form.Trigger asChild>
                  <Button backgroundColor="$blue8" color="white" size="$3">
                    Submit Scores
                  </Button>
                </Form.Trigger>
              </RoundScoresGridCell>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    </Form>
  );
}
