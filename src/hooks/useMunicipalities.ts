import { useState, useEffect, useMemo } from "react";
import { Municipality, MunicipalityListItem } from "@/types/Cities";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function useMunicipalities(searchQuery: string = "") {
  // Estado para armazenar a lista completa de municípios, sem filtro.
  const [allMunicipalities, setAllMunicipalities] = useState<
    MunicipalityListItem[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Esta função agora busca todos os municípios apenas uma vez.
    const loadMunicipalities = async () => {
      try {
        // Só busca se a lista ainda não foi carregada
        setLoading(true);
        const url = new URL(`${API_URL}/cities`);
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`Falha na resposta da rede: ${response.statusText}`);
        }
        const data = await response.json();
        setAllMunicipalities(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar municípios"
        );
      } finally {
        setLoading(false);
      }
    };

    loadMunicipalities();
  }, []);

  // Filtra a lista de municípios no lado do cliente.
  // `useMemo` otimiza o processo, refazendo o filtro apenas se a lista ou a busca mudarem.
  const filteredMunicipalities = useMemo(() => {
    if (!searchQuery) {
      return allMunicipalities;
    }
    return allMunicipalities.filter((municipality) =>
      municipality.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allMunicipalities, searchQuery]);

  return { municipalities: filteredMunicipalities, loading, error };
}

export function useMunicipality(slug: string) {
  const [municipality, setMunicipality] = useState<Municipality | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false); // Se não houver ID, para o carregamento
      return;
    }

    const loadMunicipality = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/cities/${slug}`);
        if (!response.ok) {
          throw new Error(`Falha na resposta da rede: ${response.statusText}`);
        }
        const data = await response.json();
        setMunicipality(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar município"
        );
      } finally {
        setLoading(false);
      }
    };

    loadMunicipality();
  }, [slug]); // Re-executa o efeito quando o slug muda

  return { municipality, loading, error };
}

/**
 * Hook para buscar os dados de GeoJSON de um município específico.
 * @param ibgeCode O código IBGE do município.
 */
export function useMunicipalityGeoJson(ibgeCode?: string) {
  const [geojson, setGeojson] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ibgeCode) {
      setGeojson(null);
      return;
    }

    const loadGeoJson = async () => {
      try {
        setLoading(true);
        // Assumindo que sua API tem um endpoint para GeoJSON baseado no código IBGE
        const response = await fetch(`${API_URL}/cities/geojson/${ibgeCode}`);
        if (!response.ok) {
          throw new Error("GeoJSON não encontrado para este município.");
        }
        const data = await response.json();
        setGeojson(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar GeoJSON"
        );
      } finally {
        setLoading(false);
      }
    };

    loadGeoJson();
  }, [ibgeCode]);

  return { geojson, loading, error };
}
