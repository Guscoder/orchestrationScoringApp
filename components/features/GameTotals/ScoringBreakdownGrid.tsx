import { YStack, XStack } from 'tamagui'
import { usePlayerStore } from 'store/usePlayerStore'
import { RoundScoresGridCell } from 'components/features/GameTotals/RoundScoresGridCell'
import { PlayerRoundPoints, RoundDetails } from 'store/types'
import MusicalStaff from '../../common/MusicalStaff'

const formatCategoryName = (name: string) => {
  const result = name.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

const scoringCategories = [
  'bandType',
  'bandBonus',
  'venue',
  'venueBonus',
  'musiciansRowOne',
  'musiciansRowTwo',
  'musiciansRowThree',
  'specialtyMusicians',
  'principalMusicianSecondChair',
  'principalMusicianFirstChair',
  'conductor',
  'podium',
  'musicSelection',
  'musicBonus',
  'specialGuest',
  'eventManager',
  'DecrescendoCardOne',
  'DecrescendoCardTwo',
  'crescendoCardOne',
  'crescendoCardTwo'
] as const

// export default function ScoringBreakdownGrid() {
//   const players = usePlayerStore((state) => state.players)

//   const activeRounds = [1, 2, 3, 4, 5].filter(roundNum => {
//     const roundKey = `round${roundNum}` as keyof PlayerRoundPoints
//     return players.some(player => player.roundPoints[roundKey] > 0)
//   })

//   const categoryColWidth = "20%"
//   const playerSectionWidth = `${80 / players.length}%`
//   const roundColWidth = "100%"

//   return (
//     <YStack 
//       width="100%"
//       alignItems="center" 
//       backgroundColor="$background"
//       marginTop="$4"
//     >
//       <YStack 
//         width="100%"
//         maxWidth={1000}
//         $gtXs={{ maxWidth: 600 }}
//         $gtSm={{ maxWidth: 700 }}
//         $gtMd={{ maxWidth: 800 }}
//         $gtLg={{ maxWidth: 1000 }}
//       >
//         {/* Top Musical Staff */}
//         <MusicalStaff isTop={true} />

//         {/* Header Rows */}
//         <XStack width="100%" flexDirection="row">
//           <RoundScoresGridCell width={categoryColWidth}>
//             Scoring Category
//           </RoundScoresGridCell>

//           {players.map(player => (
//             <XStack key={player.id} width={playerSectionWidth} flexDirection="column">
//               <RoundScoresGridCell 
//                 width={roundColWidth}
//                 borderLeftWidth={0}
//               >
//                 {player.name}
//               </RoundScoresGridCell>
              
//               <XStack width="100%" flexDirection="row">
//                 {activeRounds.map(roundNum => (
//                   <RoundScoresGridCell
//                     key={roundNum}
//                     width={`${100 / activeRounds.length}%`}
//                     borderLeftWidth={0}
//                     borderTopWidth={0}
//                   >
//                     R{roundNum}
//                   </RoundScoresGridCell>
//                 ))}
//               </XStack>
//             </XStack>
//           ))}
//         </XStack>

//         {/* Scoring Category Rows */}
//         {scoringCategories.map(category => (
//           <XStack 
//             key={category}
//             width="100%" 
//             flexDirection="row"
//           >
//             <RoundScoresGridCell 
//               width={categoryColWidth}
//               borderTopWidth={0}
//             >
//               {formatCategoryName(category)}
//             </RoundScoresGridCell>

//             {players.map(player => (
//               <XStack 
//                 key={`${player.id}-${category}`} 
//                 width={playerSectionWidth}
//                 flexDirection="row"
//               >
//                 {activeRounds.map(roundNum => (
//                   <RoundScoresGridCell
//                     key={roundNum}
//                     width={`${100 / activeRounds.length}%`}
//                     borderLeftWidth={0}
//                     borderTopWidth={0}
//                   >
//                     {player.roundScoring[`round${roundNum}`][category]}
//                   </RoundScoresGridCell>
//                 ))}
//               </XStack>
//             ))}
//           </XStack>
//         ))}

//         {/* Total Row */}
//         <XStack 
//           width="100%" 
//           flexDirection="row"
//         >
//           <RoundScoresGridCell 
//             width={categoryColWidth}
//             borderTopWidth={0}
//           >
//             Total
//           </RoundScoresGridCell>

//           {players.map(player => (
//             <XStack 
//               key={`${player.id}-total`}
//               width={playerSectionWidth}
//               flexDirection="row"
//             >
//               {activeRounds.map(roundNum => (
//                 <RoundScoresGridCell
//                   key={roundNum}
//                   width={`${100 / activeRounds.length}%`}
//                   borderLeftWidth={0}
//                   borderTopWidth={0}
//                 >
//                   {player.roundPoints[`round${roundNum}`]}
//                 </RoundScoresGridCell>
//               ))}
//             </XStack>
//           ))}
//         </XStack>

//         {/* Bottom Musical Staff */}
//         <MusicalStaff isTop={false} />
//       </YStack>
//     </YStack>
//   )
// }
export default function ScoringBreakdownGrid() {
    const players = usePlayerStore((state) => state.players)
  
    const activeRounds = [1, 2, 3, 4, 5].filter(roundNum => {
      const roundKey = `round${roundNum}` as keyof PlayerRoundPoints
      return players.some(player => player.roundPoints[roundKey] > 0)
    })
  
    const categoryColWidth = "20%"
    const playerSectionWidth = `${80 / players.length}%`
    const roundColWidth = "100%"
  
    return (
      <YStack 
        width="100%"
        alignItems="center" 
        backgroundColor="$background"
        marginTop="$4"
      >
        {/* Frame Container */}
        <YStack 
          width="100%"
          maxWidth={1000}
          $gtXs={{ maxWidth: 600 }}
          $gtSm={{ maxWidth: 700 }}
          $gtMd={{ maxWidth: 800 }}
          $gtLg={{ maxWidth: 1000 }}
          padding="$4"
          backgroundColor="black"
          borderRadius="$2"
        >
          {/* Content Container with inner border */}
          <YStack 
            backgroundColor="$background"
            padding="$2"
            borderRadius="$1"
          >
            {/* Musical Staff Top */}
            <MusicalStaff isTop={true} />
  
            {/* Header Rows */}
            <XStack width="100%" flexDirection="row">
              <RoundScoresGridCell width={categoryColWidth}>
                Scoring Category
              </RoundScoresGridCell>
  
              {players.map(player => (
                <XStack key={player.id} width={playerSectionWidth} flexDirection="column">
                  <RoundScoresGridCell 
                    width={roundColWidth}
                    borderLeftWidth={0}
                  >
                    {player.name}
                  </RoundScoresGridCell>
                  
                  <XStack width="100%" flexDirection="row">
                    {activeRounds.map(roundNum => (
                      <RoundScoresGridCell
                        key={roundNum}
                        width={`${100 / activeRounds.length}%`}
                        borderLeftWidth={0}
                        borderTopWidth={0}
                      >
                        R{roundNum}
                      </RoundScoresGridCell>
                    ))}
                  </XStack>
                </XStack>
              ))}
            </XStack>
  
            {/* Scoring Category Rows */}
            {scoringCategories.map(category => (
              <XStack 
                key={category}
                width="100%" 
                flexDirection="row"
              >
                <RoundScoresGridCell 
                  width={categoryColWidth}
                  borderTopWidth={0}
                >
                  {formatCategoryName(category)}
                </RoundScoresGridCell>
  
                {players.map(player => (
                  <XStack 
                    key={`${player.id}-${category}`} 
                    width={playerSectionWidth}
                    flexDirection="row"
                  >
                    {activeRounds.map(roundNum => (
                      <RoundScoresGridCell
                        key={roundNum}
                        width={`${100 / activeRounds.length}%`}
                        borderLeftWidth={0}
                        borderTopWidth={0}
                      >
                        {player.roundScoring[`round${roundNum}`][category]}
                      </RoundScoresGridCell>
                    ))}
                  </XStack>
                ))}
              </XStack>
            ))}
  
            {/* Total Row */}
            <XStack 
              width="100%" 
              flexDirection="row"
            >
              <RoundScoresGridCell 
                width={categoryColWidth}
                borderTopWidth={0}
              >
                Total
              </RoundScoresGridCell>
  
              {players.map(player => (
                <XStack 
                  key={`${player.id}-total`}
                  width={playerSectionWidth}
                  flexDirection="row"
                >
                  {activeRounds.map(roundNum => (
                    <RoundScoresGridCell
                      key={roundNum}
                      width={`${100 / activeRounds.length}%`}
                      borderLeftWidth={0}
                      borderTopWidth={0}
                    >
                      {player.roundPoints[`round${roundNum}`]}
                    </RoundScoresGridCell>
                  ))}
                </XStack>
              ))}
            </XStack>
  
            {/* Musical Staff Bottom */}
            <MusicalStaff isTop={false} />
          </YStack>
        </YStack>
      </YStack>
    )
  }