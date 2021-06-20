import MovieModel from "../../../03-back-end/src/components/movie/model";
import api from "../api/api";

export default class MovieService {
  public static async getMovieById(id: number): Promise<MovieModel> {
    return new Promise<MovieModel>(async (resolve, reject) => {
      const res = await api("get", `/movies/${id}`);
      resolve(res.data as MovieModel);
    });
  }

  public static async getRolesForMovie(id: number): Promise<MovieModel> {
    return new Promise<MovieModel>(async (resolve, reject) => {
      const res = await api("get", `/movies/${id}/roles`);
      resolve(res.data as MovieModel);
    });
  }
}
