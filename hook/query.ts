import { FAVORITES_KEY } from "@/constants";
import { FilmsResponse, PeopleResponse } from "@/types/film";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const QUERY_KEY = {
  FILMS: () => ["https://swapi.dev/api/films/"],
  FILM: (id: string) => [`https://swapi.dev/api/films/<id>`, id],
  FAVORITES: () => [`AsyncStorage.getItem(${FAVORITES_KEY})`],
  PEOPLE: () => ["https://swapi.dev/api/people/"],
};
export const useFilms = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEY.FILMS(),
    //enabled: false,
    queryFn: async () =>
      (await axios.get<FilmsResponse>("https://swapi.dev/api/films/")).data,
  });
  return { data, isLoading, error };
};

export const useFilm = (id: string) => {
  const { data, isLoading, error } = useFilms();
  const film = data?.results.find(
    (film) => film.url.split("/").filter(Boolean).pop() === id
  );
  return { film, isLoading, error };
};

export const useFavorites = () => {
  return useQuery({
    queryKey: QUERY_KEY.FAVORITES(),
    queryFn: async () =>
      JSON.parse((await AsyncStorage.getItem(FAVORITES_KEY)) || "{}") as {
        [key: string]: boolean;
      },
  });
};

export const usePeopleInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: QUERY_KEY.PEOPLE(),
    queryFn: async ({ pageParam }) => {
      const url = pageParam.includes("https://swapi.dev/api/people/")
        ? pageParam
        : `https://swapi.dev/api/people/?page=${pageParam}`;
      return (await axios.get<PeopleResponse>(url)).data;
    },
    getNextPageParam: (lastPage) => lastPage.next,
    initialPageParam: "1",
  });
};
