import { useState, useEffect } from "react";
import CinemaModel from "../../../03-back-end/src/components/cinema/model";
import { ApiResponse } from "../api/api";
import CinemaService from "../services/CinemaService";

export default function useFetchCinema(
  cinemaId: number
): [CinemaModel | null, ApiResponse | null] {
  const [data, setData] = useState<CinemaModel | null>(null);
  const [error, setError] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setData(await CinemaService.getCinemaById(+cinemaId));
      } catch (error) {
        setError(error as ApiResponse);
      }
    }
    fetch();
  }, [cinemaId]);

  return [data, error];
}
