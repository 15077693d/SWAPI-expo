import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { COLORS } from "@/constants/colors";
import { Stack, useLocalSearchParams } from "expo-router";
import { useFilm } from "@/hook/query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { FAVORITES_KEY } from "@/constants";
import { QUERY_KEY, useFavorites } from "@/hook/query";
import { useQueryClient } from "@tanstack/react-query";
export default function Page() {
  const { id } = useLocalSearchParams();
  const { film } = useFilm(id as string);
  const { data: favorites } = useFavorites();
  const queryClient = useQueryClient();
  const handleFavorite = async () => {
    const isFavorite = favorites?.[film?.url || ""] || false;
    const newFavorites = { ...favorites, [film?.url || ""]: !isFavorite };
    AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    queryClient.invalidateQueries({ queryKey: QUERY_KEY.FAVORITES() });
  };
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleFavorite}>
              <Ionicons
                name={favorites?.[film?.url || ""] ? "star" : "star-outline"}
                size={24}
                color={COLORS.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Text style={styles.title}>{film?.title}</Text>
      <Text style={styles.text}>Episode: {film?.episode_id}</Text>
      <Text style={styles.text}>Release Date: {film?.release_date}</Text>
      <Text style={styles.text}>Opening Crawl: {film?.opening_crawl}</Text>
      <Text style={styles.text}>Director: {film?.director}</Text>
      <Text style={styles.text}>Producer: {film?.producer}</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: COLORS.containerBg,
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
