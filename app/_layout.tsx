import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useAsyncStorageDevTools } from "@dev-plugins/async-storage";
// Create a client
const queryClient = new QueryClient();
export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  useAsyncStorageDevTools();

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.bg,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarStyle: {
            backgroundColor: COLORS.containerBg,
            borderTopWidth: 1,
            borderTopColor: COLORS.inactive,
          },
          tabBarActiveTintColor: COLORS.text,
          tabBarInactiveTintColor: COLORS.inactive,
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="film"
          options={{
            headerShown: false,
            title: "Film",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="film-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            title: "All Favorite",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="star-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="people"
          options={{
            title: "All People",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
