import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import React from "react";
import { COLORS } from "@/constants/colors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY, useFilms } from "@/hook/query";
import { FilmItem } from "@/components/FilmItem";
import { ListEmptyComponent } from "@/components/ListEmptyComponent";

export default function Film() {
  const { data, isLoading } = useFilms();
  const queryClient = useQueryClient();
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.results}
        keyExtractor={(item) => item.episode_id.toString()}
        renderItem={({ item }) => <FilmItem film={item} />}
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
