import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { MunicipalityDetail } from "../../components/MunicipalityDetail";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MunicipalityDetailsPage() {
  const { slug } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();

  if (typeof slug !== "string") {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: top }}>
      <MunicipalityDetail municipalitySlug={slug} />
    </ThemedView>
  );
}
