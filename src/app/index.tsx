import React, { useState } from "react";
import { prisma } from "@/lib/prisma";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const { top } = useSafeAreaInsets();
  const [municipalities, setMunicipalities] = useState<
    {
      name: string;
      id: string;
      createdAt: Date;
      updatedAt: Date;
      description: string;
      coatOfArms: string;
      latitude: number;
      longitude: number;
      about: string;
      slug: string;
      ibgeCode: string;
    }[]
  >([]);

  React.useEffect(() => {
    prisma.municipality
      .findMany({ orderBy: { name: "asc" } })
      .then(setMunicipalities)
      .catch((err) => {
        // handle error, e.g., setMunicipalities([])
        console.error(err);
      });
  }, []);

  return (
    <View style={{ paddingTop: top }} className="flex flex-1">
      <Text className="text-3xl font-bold">Index Page</Text>
      {municipalities.map((municipality) => (
        <Link key={municipality.id} href={`/municipalities/${municipality.id}`}>
          <Text className="text-lg text-blue-500">{municipality.name}</Text>
        </Link>
      ))}
    </View>
  );
}
