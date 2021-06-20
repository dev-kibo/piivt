import BaseService from "../../common/BaseService";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import { IAddProjection } from "./dto/IAddProjection";
import ProjectionModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import ApiError from "../error/ApiError";

export default class ProjectionService extends BaseService<ProjectionModel> {
  protected async adaptModel(
    data: any,
    options: Partial<IModelAdapterOptionsInterface> = {}
  ): Promise<ProjectionModel> {
    const model = new ProjectionModel();

    model.projectionId = +data?.projection_id;
    model.cinemaId = +data?.cinema_id;
    model.movieId = +data?.movie_id;
    model.startsAt = data?.starts_at;
    model.endsAt = data?.ends_at;

    return model;
  }

  public async getAll(): Promise<ProjectionModel[]> {
    return await this.getAllFromTable("projection");
  }

  public async getAllRepertoireProjections(
    id: number
  ): Promise<ProjectionModel[]> | null {
    if (!this.services.repertoireService.getById(id)) {
      return null;
    }

    return new Promise<ProjectionModel[]>(async (resolve, reject) => {
      try {
        const query: string =
          "SELECT * FROM projection WHERE repertoire_id = ?;";

        const [rows] = await this.db.execute(query, [id]);

        let results: ProjectionModel[] = [];

        if (Array.isArray(rows)) {
          for (const row of rows) {
            results.push(await this.adaptModel(row));
          }
        }

        resolve(results);
      } catch (error) {
        reject(
          new ApiError(
            "FAILED_GETTING_PROJECTIONS",
            "Failed getting projections."
          )
        );
      }
    });
  }

  public async getAllProjectionsForMovie(
    id: number,
    options: Partial<IModelAdapterOptionsInterface> = {}
  ): Promise<ProjectionModel[]> | null {
    if (!(await this.services.movieService.getById(id))) {
      return null;
    }

    return new Promise<ProjectionModel[]>(async (resolve, reject) => {
      const query: string = `SELECT
                                  projection.*
                              FROM
                                  projection
                                  INNER JOIN movie ON projection.movie_id = movie.movie_id
                              WHERE
                                  movie.movie_id = ?;`;
      try {
        const [rows] = await this.db.execute(query, [id]);

        const res: ProjectionModel[] = [];

        if (Array.isArray(rows)) {
          for (const row of rows) {
            res.push(await this.adaptModel(row, options));
          }
        }

        resolve(res);
      } catch (error) {
        reject(
          new ApiError(
            "FAILED_GETTING_PROJECTIONS",
            "Failed getting projections."
          )
        );
      }
    });
  }

  public async add(data: IAddProjection): Promise<ProjectionModel> {
    return new Promise(async (resolve, reject) => {
      const movie = await this.services.movieService.getById(data.movieId);

      if (!(await this.services.cinemaService.getById(data.cinemaId))) {
        return reject("Cinema not found.");
      }
      if (!movie) {
        return reject("Movie not found");
      }
      // TO DO

      try {
      } catch (error) {
        const e: IErrorResponse = {
          code: error?.errno,
          description: error?.message,
        };
        reject(e);
      }
    });
  }
}
