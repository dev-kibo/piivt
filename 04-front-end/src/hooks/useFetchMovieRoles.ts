import { useState, useEffect } from "react";
import RoleModel from "../../../03-back-end/src/components/role/model";
import { ApiResponse } from "../api/api";
import MovieService from "../services/MovieService";

export default function useFetchMovieRoles(
  movieId: number
): [RoleModel[], ApiResponse | null, boolean] {
  const [data, setData] = useState<RoleModel[]>([]);
  const [error, setError] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetch() {
      try {
        setData([]);
        setError(null);
        setIsLoading(true);

        setData(await MovieService.getRolesForMovie(movieId));
      } catch (error) {
        setError(error as ApiResponse);
      } finally {
        setIsLoading(false);
      }
    }

    fetch();
  }, [movieId]);

  return [data, error, isLoading];
}
