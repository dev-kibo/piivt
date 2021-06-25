import { useState, useEffect } from "react";
import RepertoireModel from "../../../03-back-end/src/components/repertoire/model";
import { ApiResponse } from "../api/api";
import RepertoireService from "../services/RepertoireService";

export default function useFetchRepertoire(
  repertoireId: number
): [RepertoireModel | null, ApiResponse | null] {
  const [data, setData] = useState<RepertoireModel | null>(null);
  const [error, setError] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        const rep: RepertoireModel = await RepertoireService.getById(
          repertoireId
        );
        setData(rep);
      } catch (error) {
        setError(error as ApiResponse);
      }
    }
    fetch();
  }, [repertoireId]);

  return [data, error];
}
