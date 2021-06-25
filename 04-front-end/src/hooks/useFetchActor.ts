import { useState, useEffect } from "react";
import ActorModel from "../../../03-back-end/src/components/actor/model";
import { ApiResponse } from "../api/api";
import ActorService from "../services/ActorService";

export default function useFetchActor(
  actorId: number
): [ActorModel | null, ApiResponse | null] {
  const [data, setData] = useState<ActorModel | null>(null);
  const [error, setError] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setData(await ActorService.getById(actorId));
      } catch (error) {
        setError(error as ApiResponse);
      }
    }
    fetch();
  }, [actorId]);

  return [data, error];
}
