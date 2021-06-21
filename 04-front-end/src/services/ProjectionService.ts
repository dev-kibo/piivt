import ProjectionModel from "../../../03-back-end/src/components/projection/model";
import api from "../api/api";
import { ApiResponse } from "../api/api";

export default class ProjectionService {
  public static async getAll(): Promise<ProjectionModel[]> {
    return new Promise<ProjectionModel[]>(async (resolve, reject) => {
      try {
        const res = await api("get", "/projections");
        resolve(res.data as ProjectionModel[]);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async searchProjections(
    searchTerm: string
  ): Promise<ProjectionModel[]> {
    return new Promise<ProjectionModel[]>(async (resolve, reject) => {
      try {
        const res = await api("get", `/projections/search/${searchTerm}`);
        resolve(res.data as ProjectionModel[]);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async getProjectionsForMovie(
    id: number
  ): Promise<ProjectionModel[]> {
    return new Promise<ProjectionModel[]>(async (resolve, reject) => {
      const res = await api("get", `/projections/movies/${id}`);

      resolve(res.data as ProjectionModel[]);
    });
  }
}
