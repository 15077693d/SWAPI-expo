import React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS } from "@/constants/colors";

export const ListEmptyComponent = ({
  loading,
  message = "No data",
}: {
  loading: boolean;
  message?: string;
}) => {
  return (
    <View style={styles.emptyContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.text} />
      ) : (
        <Text style={styles.emptyText}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  emptyText: {
    color: COLORS.text,
  },
});
