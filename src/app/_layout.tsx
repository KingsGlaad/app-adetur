import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "hls(var(--primary))" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <MaterialIcons
              size={size}
              name={focused ? "home" : "home-filled"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tracks/index"
        options={{
          title: "Rotas",
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <MaterialIcons
              size={size}
              name={focused ? "map" : "route"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
