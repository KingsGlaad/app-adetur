import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name={focused ? "home" : "home-filled"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tracks/index"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name={focused ? "route" : "map"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
