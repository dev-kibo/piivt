import { useState, useEffect } from "react";
import MovieModel from "../../../03-back-end/src/components/movie/model";
import { ApiResponse } from "../api/api";
import MovieService from "../services/MovieService";

export default function useFetchMovie(
  movieId: number,
  loadRoles: boolean = false
): [MovieModel | null, ApiResponse | null] {
  const [data, setData] = useState<MovieModel | null>(null);
  const [error, setError] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        const movie: MovieModel = await MovieService.getById(
          +movieId,
          loadRoles
        );
        setData(movie);
      } catch (error) {
        setError(error as ApiResponse);
      }
    }
    fetch();
  }, [movieId, loadRoles]);

  return [data, error];
}
