import { useState, useEffect } from "react";
import MovieModel from "../../../03-back-end/src/components/movie/model";
import { ApiResponse } from "../api/api";
import MovieService from "../services/MovieService";

export default function useFetchMovie(
  movieId: number,
  loadRoles: boolean = false
): [MovieModel | null, ApiResponse | null, boolean] {
  const [data, setData] = useState<MovieModel | null>(null);
  const [error, setError] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetch() {
      try {
        setData(null);
        setError(null);
        setIsLoading(true);

        const movie: MovieModel = await MovieService.getById(
          +movieId,
          loadRoles
        );
        setData(movie);
      } catch (error) {
        setError(error as ApiResponse);
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, [movieId, loadRoles]);

  return [data, error, isLoading];
}
