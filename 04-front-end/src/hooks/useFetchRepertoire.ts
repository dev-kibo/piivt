import { useState, useEffect } from "react";
import RepertoireModel from "../../../03-back-end/src/components/repertoire/model";
import { ApiResponse } from "../api/api";
import RepertoireService from "../services/RepertoireService";

interface IUseFetchRepertoireProps {
  repertoireId?: number;
  date?: string;
  fetchInterval?: number;
}

export default function useFetchRepertoire({
  repertoireId,
  date,
  fetchInterval,
}: IUseFetchRepertoireProps): [
  RepertoireModel | null,
  ApiResponse | null,
  boolean
] {
  const [data, setData] = useState<RepertoireModel | null>(null);
  const [error, setError] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetch() {
      try {
        setData(null);
        setError(null);
        setIsLoading(true);

        let rep: RepertoireModel | null = null;

        if (repertoireId) {
          rep = await RepertoireService.getById(repertoireId);
        } else if (date) {
          rep = await RepertoireService.getRepertoireByDate(date);
        }

        setData(rep);
      } catch (error) {
        setError(error as ApiResponse);
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, [repertoireId, date, fetchInterval]);

  return [data, error, isLoading];
}
