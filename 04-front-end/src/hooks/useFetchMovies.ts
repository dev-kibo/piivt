import { useState, useEffect } from "react";
import MovieModel from "../../../03-back-end/src/components/movie/model";
import { ApiResponse } from "../api/api";
import MovieService from "../services/MovieService";

export default function useFetchMovies(
  searchTerm: string = ""
): [MovieModel[], ApiResponse | null] {
  const [data, setData] = useState<MovieModel[]>([]);
  const [error, setError] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        const movie: MovieModel[] = await MovieService.getAll(searchTerm);
        setData(movie);
      } catch (error) {
        setError(error as ApiResponse);
      }
    }
    fetch();
  }, [searchTerm]);

  return [data, error];
}
