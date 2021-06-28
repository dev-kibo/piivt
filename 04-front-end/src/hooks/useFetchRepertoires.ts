import { useState, useEffect } from "react";
import RepertoireModel from "../../../03-back-end/src/components/repertoire/model";
import { ApiResponse } from "../api/api";
import RepertoireService from "../services/RepertoireService";

export default function useFetchRepertoires(): [
  RepertoireModel[],
  ApiResponse | null,
  boolean
] {
  const [data, setData] = useState<RepertoireModel[]>([]);
  const [error, setError] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetch() {
      try {
        setData([]);
        setError(null);
        setIsLoading(true);

        const rep: RepertoireModel[] = await RepertoireService.getAll();
        setData(
          rep.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        );
      } catch (error) {
        setError(error as ApiResponse);
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, []);

  return [data, error, isLoading];
}
