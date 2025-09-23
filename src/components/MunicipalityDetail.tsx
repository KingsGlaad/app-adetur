import React, { useRef } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import {
  useMunicipality,
  useMunicipalityGeoJson,
} from "@/hooks/useMunicipalities";
import MunicipioMap from "./MunicipioMap";
import { Highlight, Image as MunicipalityImage } from "@/types/Cities";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import MapView from "react-native-maps";
import { RenderHtml } from "./RenderHtml";

interface MunicipalityDetailProps {
  municipalitySlug: string;
}

const { width: screenWidth } = Dimensions.get("window");

export function MunicipalityDetail({
  municipalitySlug, // Usando municipalitySlug
}: MunicipalityDetailProps) {
  const { municipality, loading, error } = useMunicipality(municipalitySlug); // Passando municipalitySlug
  const { geojson } = useMunicipalityGeoJson(municipality?.ibgeCode);
  const mapRef = useRef<MapView>(null);

  if (loading) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ThemedText style={styles.loadingText}>
          Carregando município...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error || !municipality) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ThemedText style={styles.errorText}>
          Erro ao carregar município
        </ThemedText>
      </ThemedView>
    );
  }

  const handleHighlightPress = (highlight: Highlight) => {
    mapRef.current?.animateToRegion(
      {
        latitude: highlight.latitude,
        longitude: highlight.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  const renderCarouselItem = ({ item }: { item: MunicipalityImage }) => {
    return (
      <ThemedView style={styles.carouselItemContainer}>
        <Image source={{ uri: item.url }} style={styles.headerImage} />
      </ThemedView>
    );
  };

  const renderHighlightItem = ({ item }: { item: Highlight }) => (
    <TouchableOpacity
      style={styles.highlightCard}
      onPress={() => handleHighlightPress(item)}
    >
      <ThemedText style={styles.highlightCardTitle}>{item.title}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      {/* 1. Image Slider */}
      {municipality.images && municipality.images.length > 0 && (
        <FlatList
          data={municipality.images}
          renderItem={renderCarouselItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carouselContainer}
        />
      )}

      <ThemedView style={styles.contentContainer}>
        {/* 2. Title and Description */}
        <ThemedText type="title">{municipality.name}</ThemedText>
        {municipality.description && (
          <ThemedText style={styles.description}>
            {municipality.description}
          </ThemedText>
        )}

        {/* 3. Map with Highlights and GeoJSON */}
        {municipality.latitude && municipality.longitude && (
          <MunicipioMap
            ref={mapRef}
            initialLatitude={municipality.latitude}
            initialLongitude={municipality.longitude}
            highlights={municipality.highlights || []}
            geojson={geojson || undefined}
          />
        )}

        {/* 4. Horizontal Highlights List */}
        {municipality.highlights && municipality.highlights.length > 0 && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Destaques</ThemedText>
            <FlatList
              data={municipality.highlights}
              renderItem={renderHighlightItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          </ThemedView>
        )}

        {/* 5. "About" Section */}
        {municipality.about && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Sobre</ThemedText>
            <RenderHtml source={municipality.about} />
          </ThemedView>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
  },
  errorText: {
    textAlign: "center",
  },
  carouselContainer: {
    height: 250,
    marginBottom: 16,
  },
  carouselItemContainer: {
    width: screenWidth,
    height: 250,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    padding: 16,
  },
  description: {
    marginBottom: 16,
    fontSize: 16,
    marginTop: 8,
  },
  section: {
    marginBottom: 16,
  },
  highlightCard: {
    backgroundColor: "rgba(128, 128, 128, 0.2)",
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  highlightCardTitle: {
    fontWeight: "500",
  },
});
