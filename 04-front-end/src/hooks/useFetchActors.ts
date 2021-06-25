import { useState, useEffect } from "react";
import ActorModel from "../../../03-back-end/src/components/actor/model";
import { ApiResponse } from "../api/api";
import ActorService from "../services/ActorService";

export default function useFetchActors(
  searchTerm: string = ""
): [ActorModel[], ApiResponse | null] {
  const [data, setData] = useState<ActorModel[]>([]);
  const [error, setError] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setData(await ActorService.getAll(searchTerm));
      } catch (error) {
        setError(error as ApiResponse);
      }
    }
    fetch();
  }, [searchTerm]);

  return [data, error];
}
