import MovieModel from "../../../03-back-end/src/components/movie/model";
import RoleModel from "../../../03-back-end/src/components/role/model";
import api, { ApiResponse } from "../api/api";
import { apiAsForm } from "../api/api";

interface IAddMovie {
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  poster: Blob;
}

interface IAddRole {
  movieId: number;
  actorId: number;
  role: string;
}

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

  public static async add({
    title,
    description,
    releaseDate,
    duration,
    poster,
  }: IAddMovie): Promise<MovieModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = new FormData();
        data.append("title", title);
        data.append("description", description);
        data.append("releasedAt", releaseDate);
        data.append("duration", "" + duration);
        data.append("poster", poster);

        const res = await apiAsForm("post", "/movies", data);
        resolve(res.data as MovieModel);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async addRolesToMovie(data: IAddRole[]): Promise<RoleModel[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const result: RoleModel[] = [];

        console.log(data);

        for (const role of data) {
          const response = await api("post", "/roles", role);
          result.push(response.data as RoleModel);
        }

        resolve(result);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }
}
