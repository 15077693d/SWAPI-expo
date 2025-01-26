import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/colors";
import { Film } from "@/types/film";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY, useFavorites } from "@/hook/query";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FilmItem = ({ film }: { film: Film }) => {
  const id = film.url.split("/").filter(Boolean).pop();
  return (
    <Link href={`/film/${id}`} asChild>
      <TouchableOpacity>
        <View style={styles.filmItem}>
          <Text style={styles.filmItemText}>{film.title}</Text>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.filmDetailText}>
              Episode: {film.episode_id}
            </Text>
            <Text style={styles.filmDetailText}>
              Release Date: {film.release_date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export const FavoriteFilmItem = ({ film }: { film: Film }) => {
  const id = film.url.split("/").filter(Boolean).pop();
  const queryClient = useQueryClient();
  const { data: favorites } = useFavorites();

  const handleFavorite = async () => {
    const newFavorites = { ...favorites, [film?.url || ""]: false };
    AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    queryClient.invalidateQueries({ queryKey: QUERY_KEY.FAVORITES() });
  };
  return (
    <View style={styles.favorite}>
      <Link href={`/film/${id}`} asChild>
        <Text style={styles.filmItemText}>{film.title}</Text>
      </Link>
      <TouchableOpacity onPress={handleFavorite}>
        <Ionicons name="trash" size={24} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  favorite: {
    backgroundColor: COLORS.inactive,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filmItem: {
    backgroundColor: COLORS.bg,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  filmItemText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  filmDetailText: {
    color: "white",
    fontSize: 12,
    marginBottom: 5,
  },
});
