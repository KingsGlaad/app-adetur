import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { MunicipalityDetail } from "../../components/MunicipalityDetail";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

/**
 * This is the screen file for the dynamic route /cities/[slug].
 * It extracts the 'slug' from the URL and passes it to the detail component.
 */
export default function MunicipalityDetailsPage() {
  const { slug } = useLocalSearchParams();

  // Ensure slug is a string before using it. This handles cases where the
  // URL might be malformed or the param is not yet available.
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

  return <MunicipalityDetail municipalitySlug={slug} />;
}
