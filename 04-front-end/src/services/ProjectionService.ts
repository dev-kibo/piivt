import ProjectionModel from "../../../03-back-end/src/components/projection/model";
import api from "../api/api";

export default class ProjectionService {
  public static async getProjectionsForMovie(
    id: number
  ): Promise<ProjectionModel[]> {
    return new Promise<ProjectionModel[]>(async (resolve, reject) => {
      const res = await api("get", `/projections/movies/${id}`);

      resolve(res.data as ProjectionModel[]);
    });
  }
}
