// import { Link, Tabs } from "expo-router";
// import { Button, useTheme } from "tamagui";
// import { Atom, AudioWaveform } from "@tamagui/lucide-icons";

// export default function TabLayout() {
//   const theme = useTheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: theme.red10.val,
//         tabBarStyle: {
//           backgroundColor: theme.background.val,
//           borderTopColor: theme.borderColor.val,
//         },
//         headerStyle: {
//           backgroundColor: theme.background.val,
//           borderBottomColor: theme.borderColor.val,
//         },
//         headerTintColor: theme.color.val,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Start Game",
//           tabBarIcon: ({ color }) => <Atom color={color} />,
//           // headerRight: () => (
//           //   <Link href="/modal" asChild>
//           //     <Button mr="$4" bg="$purple8" color="$purple12">
//           //       Hello!
//           //     </Button>
//           //   </Link>
//           // ),
//         }}
//       />
//       <Tabs.Screen
//         name="two"
//         options={{
//           title: "Scoring Entry",
//           tabBarIcon: ({ color }) => <AudioWaveform color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="three"
//         options={{
//           title: "Round Stats",
//           tabBarIcon: ({ color }) => <AudioWaveform color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
import { Link, Tabs } from "expo-router";
import { Button, useTheme, Toast } from "tamagui";
import { Atom, AudioWaveform, BarChart3 } from "@tamagui/lucide-icons";
import { ToastViewport } from "@tamagui/toast";

export default function TabLayout() {
  const theme = useTheme();

  // Custom toast styles matching your new theme
  const toastStyles = {
    success: {
      backgroundColor: theme.secondary.val, // Using #A5BE00 for success
      color: theme.background.val, // Using #EBF2FA for text
    },
    error: {
      backgroundColor: theme.error.val, // Using #FF3B30 for error
      color: theme.background.val,
    },
    warning: {
      backgroundColor: theme.warning.val, // Using #FF9500 for warning
      color: theme.background.val,
    },
    info: {
      backgroundColor: theme.quaternary.val, // Using #427AA1 for info
      color: theme.background.val,
    },
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.primary.val, // Using primary #05668D
          tabBarInactiveTintColor: theme.quaternary.val, // Using quaternary #427AA1
          tabBarStyle: {
            backgroundColor: theme.background.val, // Using background #EBF2FA
            borderTopColor: theme.tertiary.val, // Using tertiary #679436
          },
          headerStyle: {
            backgroundColor: theme.background.val,
            borderBottomColor: theme.tertiary.val,
          },
          headerTintColor: theme.primary.val,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Start Game",
            tabBarIcon: ({ color }) => <Atom color={color} />,
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Scoring Entry",
            tabBarIcon: ({ color }) => <AudioWaveform color={color} />,
          }}
        />
        <Tabs.Screen
          name="three"
          options={{
            title: "Round Stats",
            tabBarIcon: ({ color }) => <BarChart3 color={color} />,
          }}
        />
      </Tabs>

      <ToastViewport
        flexDirection="column-reverse"
        top="$2"
        left="$2"
        right="$2"
        bottom="$2"
        margin="$2"
      />
    </>
  );
}

// Create a custom Toast helper
const showToast = (
  message: string,
  type: "success" | "error" | "warning" | "info"
) => {
  const theme = useTheme();
  const styles = {
    success: {
      backgroundColor: theme.secondary.val,
      color: theme.background.val,
    },
    error: {
      backgroundColor: theme.error.val,
      color: theme.background.val,
    },
    warning: {
      backgroundColor: theme.warning.val,
      color: theme.background.val,
    },
    info: {
      backgroundColor: theme.quaternary.val,
      color: theme.background.val,
    },
  };

  Toast.show(message, {
    ...styles[type],
    duration: 4000,
  });
};

// Usage example:
/*
// Success toast
showToast('Game saved successfully!', 'success');

// Error toast
showToast('Error saving game', 'error');

// Info toast
showToast('New round started', 'info');

// Warning toast
showToast('Almost out of time!', 'warning');
*/
