export enum BandType {
    MARCHING = 'Marching Band',
    BIG_BAND = 'Big Band',
    JAZZ = 'Jazz Ensemble',
    SYMPHONY = 'Symphony Orchestra',
    ROCK = 'Rock Band',
    VOCAL = 'Vocal Ensemble'
}

export const BAND_BONUS_VALUES = [
{ label: '0 points', value: '0' },
  { label: '30 points', value: '30' },
  { label: '45 points', value: '45' },
  { label: '60 points', value: '60' },
] as const

export const VENUES = [
    // Size 1
    { name: 'Riverside Park Bandstand', size: 1, score: 27, cost: 23, bonus: BandType.SYMPHONY },
    { name: 'Central Park Band Shell', size: 1, score: 24, cost: 21, bonus: BandType.BIG_BAND },
    { name: 'Stone Pony', size: 1, score: 21, cost: 19, bonus: BandType.ROCK },
    { name: 'The Troubadour', size: 1, score: 18, cost: 17, bonus: '' },
    { name: 'El Club', size: 1, score: 15, cost: 15, bonus: '' },
    { name: 'Preservation Hall', size: 1, score: 14, cost: 14, bonus: BandType.JAZZ },
    { name: 'Central High Stadium', size: 1, score: 13, cost: 13, bonus: BandType.MARCHING },
    { name: "Smitty's BBQ Pit", size: 1, score: 12, cost: 12, bonus: '' },
    { name: 'Bluebird Café', size: 1, score: 11, cost: 11, bonus: BandType.VOCAL },
    // Size 2
    { name: 'The Forum', size: 2, score: 46, cost: 46, bonus: BandType.MARCHING },
    { name: "Colosseum @ Caesar's", size: 2, score: 42, cost: 42, bonus: BandType.ROCK },
    { name: 'Rosemont Theater', size: 2, score: 38, cost: 38, bonus: BandType.VOCAL },
    { name: 'Tower Theater', size: 2, score: 34, cost: 34, bonus: '' },
    { name: 'Kimmel Center', size: 2, score: 30, cost: 30, bonus: BandType.SYMPHONY },
    { name: 'Ryman Auditorium', size: 2, score: 29, cost: 28, bonus: '' },
    { name: 'Powell Symphony Hall', size: 2, score: 28, cost: 26, bonus: '' },
    { name: 'Paramount Theatre', size: 2, score: 26, cost: 23, bonus: '' },
    { name: 'Waller Creek Amphitheater', size: 2, score: 24, cost: 21, bonus: BandType.JAZZ },
    // Size 3
    { name: 'Big House Stadium', size: 3, score: 69, cost: 69, bonus: '' },
    { name: 'Riverbend Music Center', size: 3, score: 63, cost: 63, bonus: BandType.ROCK },
    { name: 'Hollywood Bowl', size: 3, score: 57, cost: 57, bonus: '' },
    { name: 'Red Rocks Amphitheatre', size: 3, score: 51, cost: 48, bonus: '' },
    { name: 'Shrine Auditorium', size: 3, score: 45, cost: 45, bonus: BandType.VOCAL },
    { name: 'Koussevitzky Music Shed', size: 3, score: 43, cost: 42, bonus: BandType.BIG_BAND },
    { name: 'Ardis Krainik Theatre', size: 3, score: 41, cost: 39, bonus: BandType.JAZZ },
    { name: 'Kennedy Center', size: 3, score: 39, cost: 36, bonus: '' },
    { name: 'Carnegie Music Hall', size: 3, score: 37, cost: 33, bonus: BandType.SYMPHONY },
] as const

export interface Music {
    name: string;
    size: 1 | 2 | 3;
    score: number;
    cost: number;
    bonus: BandType | '';
}

export const MUSIC_SELECTIONS: Music[] = [
    // Size 1
    { name: 'Mack the Knife', size: 1, score: 18, cost: 23, bonus: '' },
    { name: 'Sweet Caroline', size: 1, score: 16, cost: 21, bonus: '' },
    { name: 'Hey Baby', size: 1, score: 14, cost: 19, bonus: '' },
    { name: "Can't Help Falling in Love", size: 1, score: 12, cost: 17, bonus: BandType.VOCAL },
    { name: 'Rock and Roll - Part II', size: 1, score: 10, cost: 15, bonus: BandType.MARCHING },
    { name: 'Green Onions', size: 1, score: 9, cost: 14, bonus: BandType.JAZZ },
    { name: 'Fly Me to the Moon', size: 1, score: 8, cost: 13, bonus: BandType.BIG_BAND },
    { name: 'I Love Rock and Roll', size: 1, score: 7, cost: 12, bonus: BandType.ROCK },
    { name: 'Jupiter', size: 1, score: 6, cost: 11, bonus: BandType.SYMPHONY },

    // Size 2
    { name: 'Cannon in D', size: 2, score: 36, cost: 46, bonus: '' },
    { name: 'The Final Countdown', size: 2, score: 32, cost: 42, bonus: '' },
    { name: 'Georgia on my Mind', size: 2, score: 28, cost: 38, bonus: '' },
    { name: "It Don't Mean a Thing", size: 2, score: 24, cost: 34, bonus: BandType.JAZZ },
    { name: 'In the Mood', size: 2, score: 20, cost: 30, bonus: BandType.BIG_BAND },
    { name: 'Africa', size: 2, score: 19, cost: 28, bonus: BandType.VOCAL },
    { name: 'Fanfare for Common Man', size: 2, score: 18, cost: 26, bonus: BandType.SYMPHONY },
    { name: 'Seven Nation Army', size: 2, score: 17, cost: 24, bonus: BandType.MARCHING },
    { name: "Don't Stop Believin'", size: 2, score: 16, cost: 21, bonus: BandType.ROCK },

    // Size 3
    { name: 'Symphony #9', size: 3, score: 54, cost: 69, bonus: BandType.SYMPHONY },
    { name: '1812 Overture', size: 3, score: 48, cost: 63, bonus: '' },
    { name: 'Summertime', size: 3, score: 42, cost: 57, bonus: BandType.JAZZ },
    { name: 'Rhapsody in Blue', size: 3, score: 36, cost: 51, bonus: BandType.BIG_BAND },
    { name: 'God Help the Outcasts', size: 3, score: 30, cost: 45, bonus: BandType.VOCAL },
    { name: 'William Tell Overture', size: 3, score: 28, cost: 42, bonus: '' },
    { name: 'Bohemian Rhapsody', size: 3, score: 26, cost: 39, bonus: BandType.ROCK },
    { name: 'Stairway to Heaven', size: 3, score: 24, cost: 36, bonus: '' },
    { name: '25 or 6 to 4', size: 3, score: 22, cost: 32, bonus: BandType.MARCHING },
];

export const scoringCategories = [
    'bandBonus',
    'venue',
    'venueBonus',
    'musicSelection',
    'musicBonus',
    'musiciansRowOne',
    'musiciansRowTwo',
    'musiciansRowThree',
    'specialtyMusicians',
    'principalMusicianSecondChair',
    'principalMusicianFirstChair',
    'conductor',
    'podium',
    'specialGuest',
    'eventManager',
    'marketingTokens',
    'DecrescendoCardOne',
    'DecrescendoCardTwo',
    'crescendoCardOne',
    'crescendoCardTwo'
] as const
