import { useState, useEffect } from "react";
import RepertoireModel from "../../../03-back-end/src/components/repertoire/model";
import { ApiResponse } from "../api/api";
import RepertoireService from "../services/RepertoireService";

export default function useFetchRepertoires(): [
  RepertoireModel[],
  ApiResponse | null
] {
  const [data, setData] = useState<RepertoireModel[]>([]);
  const [error, setError] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        const rep: RepertoireModel[] = await RepertoireService.getAll();
        setData(
          rep.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        );
      } catch (error) {
        setError(error as ApiResponse);
      }
    }
    fetch();
  }, []);

  return [data, error];
}
