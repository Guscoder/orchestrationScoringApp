// import { config as configBase } from '@tamagui/config/v3'
// import { createTamagui, createTokens } from 'tamagui'

// // Define your custom colors
// const customColors = {
//   primary: '#4056a1',
//   secondary: '#d79922',
//   tertiary: '#c5cbe3',
//   quaternary: '#f13c20',
//   success: '#4056a1',
//   warning: '#f13c20',
//   error: '#f13c20',
//   background: '#EFE2ba',
//   buttonBackground: '#d79922',
//   buttonBackgroundHover: '#c5cbe3',
//   // Add more custom colors as needed
// }

// // Create custom tokens by extending the base config
// const tokens = {
//   ...configBase.tokens,
//   color: {
//     ...configBase.tokens.color,
//     ...customColors,
//   },
// }

// // Extend the themes
// const themes = {
//   ...configBase.themes,
//   light: {
//     ...configBase.themes.light,
//     color: customColors.primary,
//     ...customColors,
//   },
//   dark: {
//     ...configBase.themes.dark,
//     background: 'black',
//     color: 'white',
//     ...customColors,
//   },
// }

// // Create the config by extending the base config
// export const config = createTamagui({
//   ...configBase,
//   tokens,
//   themes,
// })

// export default config

// export type Conf = typeof config

// declare module 'tamagui' {
//   interface TamaguiCustomConfig extends Conf {}
// }


import { config as configBase } from '@tamagui/config/v3'
import { createTamagui, createTokens, createFont } from 'tamagui'

// Define your custom colors
const customColors = {
  primary: '#4056a1',
  secondary: '#d79922',
  tertiary: '#c5cbe3',
  quaternary: '#f13c20',
  success: '#4056a1',
  warning: '#f13c20',
  error: '#f13c20',
  background: '#EFE2ba',
  buttonBackground: '#c5cbe3',
  buttonBackgroundHover: '#f13c20',
}

// Create the Sedgwick Ave font configuration
const BoogalooFont = createFont({
  family: 'BoogalooRegular',
  size: {
    2: 12,
    3: 14,
    4: 20,
    5: 20,
    6: 22,
    7: 26,
    8: 32,
    9: 38,
    10: 44,
  },
  lineHeight: {
    2: 17,
    3: 20,
    4: 23,
    5: 26,
    6: 31,
    7: 36,
    8: 42,
    9: 49,
    10: 55,
  },
  weight: {
    4: '400',
  },
  face: {
    400: { normal: 'BoogalooRegular' },
  },
})

// Create custom tokens by extending the base config
const tokens = {
  ...configBase.tokens,
  color: {
    ...configBase.tokens.color,
    ...customColors,
  },
}

// Extend the themes
const themes = {
  ...configBase.themes,
  light: {
    ...configBase.themes.light,
    color: customColors.primary,
    ...customColors,
  },
  dark: {
    ...configBase.themes.dark,
    background: 'black',
    color: 'white',
    ...customColors,
  },
}

// Create the config by extending the base config
export const config = createTamagui({
  ...configBase,
  tokens,
  themes,
  fonts: {
    heading: BoogalooFont,
    body: BoogalooFont,
    default: BoogalooFont,
  },
  defaultFont: 'default',
})

export default config

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

