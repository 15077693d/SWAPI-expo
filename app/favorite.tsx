import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import React from "react";
import { QUERY_KEY, useFavorites, useFilms } from "@/hook/query";
import { COLORS } from "@/constants/colors";
import { FavoriteFilmItem, FilmItem } from "@/components/FilmItem";
import { ListEmptyComponent } from "@/components/ListEmptyComponent";
import { useQueryClient } from "@tanstack/react-query";

export default function Favorites() {
  const { data: favorites, isLoading } = useFavorites();
  const { data: films } = useFilms();
  const queryClient = useQueryClient();
  return (
    <View style={styles.container}>
      <FlatList
        data={films?.results.filter((film) => favorites?.[film.url])}
        keyExtractor={(item) => item.episode_id.toString()}
        renderItem={({ item }) => <FavoriteFilmItem film={item} />}
        ListEmptyComponent={
          <ListEmptyComponent loading={isLoading} message="No films found" />
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() =>
              queryClient.invalidateQueries({ queryKey: QUERY_KEY.FILMS() })
            }
            colors={[COLORS.text]} // Android
            tintColor={COLORS.text} // iOS
          />
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBg,
  },
});
