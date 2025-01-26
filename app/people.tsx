import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React from "react";
import { usePeopleInfiniteQuery } from "@/hook/query";
import { COLORS } from "@/constants/colors";
import { People } from "@/types/film";
export default function Page() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    usePeopleInfiniteQuery();
  return (
    <FlatList
      style={styles.container}
      keyExtractor={(item) => item.url}
      data={data?.pages.reduce((acc, page) => {
        page.results.forEach((people) => {
          acc.push(people);
        });
        return acc;
      }, [] as People[])}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              paddingHorizontal: 20,
              backgroundColor: COLORS.inactive,
              borderRadius: 10,
              marginBottom: 10,
            }}
            key={item.name}
          >
            <Text style={styles.text}>{item.name}</Text>
            <View>
              <Text style={styles.text}>Height: {item.height}</Text>
              <Text style={styles.text}>Gender: {item.gender}</Text>
            </View>
          </View>
        );
      }}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.3}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.containerBg,
    flex: 1,
    padding: 10,
  },
  text: {
    color: COLORS.text,
  },
});
