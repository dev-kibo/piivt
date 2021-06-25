import { useState, useEffect } from "react";
import CinemaModel from "../../../03-back-end/src/components/cinema/model";
import { ApiResponse } from "../api/api";
import CinemaService from "../services/CinemaService";

export default function useFetchCinemas(
  searchTerm: string = ""
): [CinemaModel[], ApiResponse | null] {
  const [data, setData] = useState<CinemaModel[]>([]);
  const [error, setError] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setData(await CinemaService.getAllCinemas(searchTerm));
      } catch (error) {
        setError(error as ApiResponse);
      }
    }
    fetch();
  }, [searchTerm]);

  return [data, error];
}
