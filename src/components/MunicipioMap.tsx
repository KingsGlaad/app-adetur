import React, { forwardRef } from "react";
import MapView, { Geojson, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";
// Corrigidos os caminhos de importação para usar caminhos relativos
import { Highlight } from "@/types/Cities";
import { useColorScheme } from "@/hooks/useColorScheme";
import { mapStyleDark } from "./mapStyleDark";

interface MunicipioMapProps {
  highlights: Highlight[];
  geojson?: object; // GeoJSON data for the municipality boundary
  initialLatitude: number;
  initialLongitude: number;
}

// IMPORTANTE: Para usar o PROVIDER_GOOGLE no Android e iOS,
// você precisa configurar as chaves da API do Google Maps
// nos seus arquivos nativos (AndroidManifest.xml e AppDelegate.m).
// Consulte a documentação do react-native-maps.

const MunicipioMap = forwardRef<MapView, MunicipioMapProps>(
  ({ highlights, geojson, initialLatitude, initialLongitude }, ref) => {
    const colorScheme = useColorScheme();

    const initialRegion = {
      latitude: initialLatitude,
      longitude: initialLongitude,
      latitudeDelta: 0.2, // Zoom level
      longitudeDelta: 0.2,
    };

    return (
      <View style={styles.container}>
        <MapView
          ref={ref}
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          customMapStyle={colorScheme === "dark" ? mapStyleDark : []}
        >
          {geojson && (
            <Geojson
              // A tipagem do react-native-maps para GeoJSON pode ser estrita
              // e às vezes não corresponde perfeitamente à estrutura de dados
              // retornada por algumas APIs. O @ts-ignore é uma solução
              // temporária se o GeoJSON estiver renderizando corretamente.
              // @ts-ignore
              geojson={geojson}
              strokeColor="#007AFF"
              fillColor="rgba(0, 122, 255, 0.1)"
              strokeWidth={2}
            />
          )}

          {highlights.map((highlight) => (
            <Marker
              key={highlight.id}
              coordinate={{
                latitude: highlight.latitude,
                longitude: highlight.longitude,
              }}
              title={highlight.title}
              description={highlight.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
});

export default MunicipioMap;
