import React, { useState } from "react";
import { Image, TextInput, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MunicipalityList } from "@/components/MunicipalityList";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function Page() {
  const { top } = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  return (
    <ThemedView style={[styles.container, { paddingTop: top }]}>
      <ThemedView style={styles.header}>
        <Image
          source={require("@/assets/images/logo-adetur2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <ThemedView
          style={[styles.searchContainer, { borderColor: themeColors.icon }]}
        >
          <MaterialIcons name="search" size={20} color={themeColors.icon} />
          <TextInput
            placeholder="Pesquisar município..."
            style={[styles.searchInput, { color: themeColors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={themeColors.icon}
          />
        </ThemedView>
      </ThemedView>
      <MunicipalityList searchQuery={searchQuery} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: "center",
  },
  logo: {
    width: 128,
    height: 100,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});
