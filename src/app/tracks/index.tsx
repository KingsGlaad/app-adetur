import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }} className="flex flex-1 ">
      <Text>Pagina de track</Text>
    </View>
  );
}
