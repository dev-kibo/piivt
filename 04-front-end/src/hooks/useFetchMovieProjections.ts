import { useState, useEffect } from "react";
import ProjectionModel from "../../../03-back-end/src/components/projection/model";
import { ApiResponse } from "../api/api";
import ProjectionService from "../services/ProjectionService";

export default function useFetchMovieProjections(
  movieId: number
): [ProjectionModel[], ApiResponse | null, boolean] {
  const [data, setData] = useState<ProjectionModel[]>([]);
  const [error, setError] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetch() {
      try {
        setData([]);
        setError(null);
        setIsLoading(true);

        const res = await ProjectionService.getProjectionsForMovie(movieId);
        res.sort(
          (a, b) =>
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        );

        setData(res);
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
