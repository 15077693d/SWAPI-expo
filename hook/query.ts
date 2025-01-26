import { FAVORITES_KEY } from "@/constants";
import { FilmsResponse } from "@/types/film";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const QUERY_KEY = {
  FILMS: () => ["https://swapi.dev/api/films/"],
  FILM: (id: string) => [`https://swapi.dev/api/films/<id>`, id],
  FAVORITES: () => [`AsyncStorage.getItem(${FAVORITES_KEY})`],
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
