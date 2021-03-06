import BaseService from "../../common/BaseService";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import IAddProjection from "./dto/IAddProjection";
import ProjectionModel from "./model";
import ApiError from "../error/ApiError";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import IDeleteProjection from "./dto/IDeleteProjection";

interface IProjectionModelAdapterOptions extends IModelAdapterOptionsInterface {
  loadMovie: boolean;
  loadCinema: boolean;
}

export default class ProjectionService extends BaseService<ProjectionModel> {
  protected async adaptModel(
    data: any,
    options: Partial<IProjectionModelAdapterOptions> = {}
  ): Promise<ProjectionModel> {
    const model = new ProjectionModel();

    model.projectionId = +data?.projection_id;
    model.startsAt = data?.starts_at;
    model.endsAt = data?.ends_at;

    if (options.loadMovie) {
      model.movie = await this.services.movieService.getById(+data?.movie_id);
    }

    if (options.loadCinema) {
      model.cinema = await this.services.cinemaService.getById(
        +data?.cinema_id
      );
    }

    return model;
  }

  public async getAll(): Promise<ProjectionModel[]> {
    return await this.getAllFromTable("projection");
  }

  public async getById(id: number): Promise<ProjectionModel> {
    return await this.getByIdFromTable("projection", id);
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
          "SELECT * FROM projection WHERE repertoire_id = ? AND is_deleted = 0;";

        const [rows] = await this.db.execute(query, [id]);

        let results: ProjectionModel[] = [];

        if (Array.isArray(rows)) {
          for (const row of rows) {
            results.push(
              await this.adaptModel(row, { loadMovie: true, loadCinema: true })
            );
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

  public async getAllProjectionsThatMatchSearchTerm(
    searchTerm: string,
    options: IModelAdapterOptions = {}
  ): Promise<ProjectionModel[]> {
    return new Promise<ProjectionModel[]>(async (resolve, reject) => {
      const query: string = `
                            SELECT
                                *
                            FROM
                                projection
                                INNER  JOIN movie on projection.movie_id = movie.movie_id
                            WHERE
                                movie.title LIKE CONCAT('%', ?, '%') AND
                                projection.is_deleted = 0`;

      try {
        const [rows] = await this.db.execute(query, [searchTerm.toLowerCase()]);

        const res: ProjectionModel[] = [];

        if (Array.isArray(rows)) {
          for (const row of rows) {
            res.push(await this.adaptModel(row, options));
          }
        }

        resolve(res);
      } catch (error) {
        reject(
          new ApiError("PROJECTION_SEARCH_FAILED", "Failed projection search.")
        );
      }
    });
  }

  public async getAllProjectionsForMovie(
    id: number,
    options: Partial<IProjectionModelAdapterOptions> = {}
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
        reject(
          new ApiError("PROJECTION_ADD_FAILED", "Failed adding new projection.")
        );
      }
    });
  }

  public async deleteProjections(
    repertoireId: number,
    data: IDeleteProjection[]
  ): Promise<boolean> | null {
    if (!(await this.services.repertoireService.getById(repertoireId))) {
      return null;
    }

    return new Promise<boolean>(async (resolve, reject) => {
      const query: string =
        "UPDATE projection SET is_deleted = 1 WHERE projection_id = ?;";

      for (const item of data) {
        try {
          await this.db.execute(query, [item.projectionId]);
        } catch (error) {
          return reject(
            new ApiError(
              "DELETE_FAILED",
              `Failed deleting projection with id '${item.projectionId}'`
            )
          );
        }
      }

      resolve(true);
    });
  }
}
