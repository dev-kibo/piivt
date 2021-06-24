import BaseService from "../../common/BaseService";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import IAddRepertoire from "./dto/IAddRepertoire";
import RepertoireModel from "./model";
import MovieModel from "../movie/model";
import CinemaModel from "../cinema/model";
import ApiError from "../error/ApiError";
import IUpdateRepertoire from "./dto/IUpdateRepertoire";

class RepertoireModelAdapterOptions implements IModelAdapterOptionsInterface {
  loadProjections: boolean;
}

export default class RepertoireService extends BaseService<RepertoireModel> {
  protected async adaptModel(
    data: any,
    options: Partial<RepertoireModelAdapterOptions>
  ): Promise<RepertoireModel> {
    const model = new RepertoireModel();

    model.date = data?.show_at;
    model.repertoireId = +data?.repertoire_id;

    if (options.loadProjections) {
      model.projections =
        await this.services.projectionService.getAllRepertoireProjections(
          model.repertoireId
        );
    }

    return model;
  }

  public async getAll(
    options: RepertoireModelAdapterOptions = { loadProjections: true }
  ): Promise<RepertoireModel[]> {
    return await this.getAllFromTable("repertoire", options);
  }

  public async getByDate(
    date: string,
    options: Partial<RepertoireModelAdapterOptions> = { loadProjections: true }
  ): Promise<RepertoireModel | null> {
    return new Promise<RepertoireModel | null>(async (resolve, reject) => {
      console.log(date);
      if (!Date.parse(date)) {
        return reject(
          new ApiError(
            "DATE_INVALID",
            "Invalid date format. Date must be in yyyy-MM-dd format."
          )
        );
      }

      const dateFilter: Date = new Date(date);
      const mariaDbDate: string = date.slice(0, 10);
      // next 7 days
      dateFilter.setDate(dateFilter.getDate() + 7);
      const mariaDbDateFilter: string = dateFilter.toISOString().slice(0, 10);

      const query: string =
        "SELECT * FROM repertoire WHERE show_at BETWEEN ? AND ?;";

      const [rows] = await this.db.execute(query, [
        mariaDbDate,
        mariaDbDateFilter,
      ]);

      if (!Array.isArray(rows)) {
        return resolve(null);
      }

      if (rows.length === 0) {
        return resolve(null);
      }

      resolve(await this.adaptModel(rows[0], options));
    });
  }

  public async getById(
    id: number,
    options: RepertoireModelAdapterOptions = { loadProjections: true }
  ): Promise<RepertoireModel> | null {
    return await this.getByIdFromTable("repertoire", id, options);
  }

  public async add(data: IAddRepertoire): Promise<RepertoireModel | null> {
    return new Promise<RepertoireModel | null>(async (resolve, reject) => {
      if (!Date.parse(data.startsAt)) {
        return reject(
          new ApiError(
            "DATE_INVALID",
            "Invalid date format. Date must be in yyyy-MM-dd format."
          )
        );
      }

      if (new Date(data.startsAt).getTime() < Date.now()) {
        return reject(
          new ApiError(
            "PROJECTION_DATE_INVALID",
            "Invalid date. Projection can't start in the past."
          )
        );
      }

      for (const projection of data.projections) {
        const movie: MovieModel | null =
          await this.services.movieService.getById(projection.movieId);
        const cinema: CinemaModel | null =
          await this.services.cinemaService.getById(projection.cinemaId);

        if (movie === null) {
          return reject(
            new ApiError(
              "MOVIE_NOT_FOUND",
              `Movie with id '${projection.movieId}' doesn't exist.`
            )
          );
        }

        if (cinema === null) {
          return reject(
            new ApiError(
              "CINEMA_NOT_FOUND",
              `Cinema with id '${projection.movieId}' doesn't exist.`
            )
          );
        }
      }

      try {
        await this.db.beginTransaction();

        const query: string = "INSERT repertoire SET show_at = ?;";

        const result = await this.db.execute(query, [
          this.toDateString(new Date(data.startsAt)),
        ]);

        const insertInfo: any = result[0];

        const repId = +insertInfo?.insertId;

        const insertQuery =
          "INSERT projection SET repertoire_id = ?, starts_at = ?, ends_at = ?, cinema_id = ?, movie_id = ?;";

        let date: Date = new Date(data.startsAt);

        for (const projection of data.projections) {
          const movie = await this.services.movieService.getById(
            projection.movieId
          );

          const startsAt: Date = date;

          const min: number = movie.duration + 10 + 15;

          date = this.addMinutes(date, min);

          const endsAt: Date = date;

          await this.db.execute(insertQuery, [
            repId,
            startsAt,
            endsAt,
            projection.cinemaId,
            projection.movieId,
          ]);
        }

        await this.db.commit();

        resolve(
          await this.getById(repId, {
            loadProjections: true,
          })
        );
      } catch (error) {
        await this.db.rollback();

        console.log(error.errno);
        console.log(error.message);

        if (error?.errno === 1062) {
          reject(
            new ApiError(
              "FAILED_ADDING_REPERTOIRE",
              `Repertoire for '${new Date(data.startsAt).toLocaleDateString(
                "sr-RS"
              )}' already exists.`
            )
          );
        }

        reject(
          new ApiError(
            "FAILED_ADDING_REPERTOIRE",
            "Failed adding new repertoire."
          )
        );
      }
    });
  }

  public async addOrUpdate(
    id: number,
    data: IUpdateRepertoire
  ): Promise<RepertoireModel> | null {
    if (!(await this.getById(id))) {
      return null;
    }

    return new Promise<RepertoireModel>(async (resolve, reject) => {
      if (!Date.parse(data.startsAt)) {
        return reject(
          new ApiError(
            "DATE_INVALID",
            "Invalid date format. Date must be in yyyy-MM-dd format."
          )
        );
      }

      if (new Date(data.startsAt).getTime() < Date.now()) {
        return reject(
          new ApiError(
            "PROJECTION_DATE_INVALID",
            "Invalid date. Projection can't start in the past."
          )
        );
      }

      for (const projection of data.projections) {
        const movie: MovieModel | null =
          await this.services.movieService.getById(projection.movieId);
        const cinema: CinemaModel | null =
          await this.services.cinemaService.getById(projection.cinemaId);

        if (movie === null) {
          return reject(
            new ApiError(
              "MOVIE_NOT_FOUND",
              `Movie with id '${projection.movieId}' doesn't exist.`
            )
          );
        }

        if (cinema === null) {
          return reject(
            new ApiError(
              "CINEMA_NOT_FOUND",
              `Cinema with id '${projection.movieId}' doesn't exist.`
            )
          );
        }
      }

      try {
        await this.db.beginTransaction();

        const query: string = `
                          UPDATE
                              repertoire
                          SET 
                              show_at = ?
                          WHERE
                              repertoire_id = ?;`;

        await this.db.execute(query, [
          this.toDateString(new Date(data.startsAt)),
          id,
        ]);

        const updateQuery: string = `
                          UPDATE
                              projection
                          SET
                              starts_at = ?,
                              ends_at = ?,
                              cinema_id = ?,
                              movie_id = ?
                          WHERE
                              repertoire_id = ?;`;

        const insertQuery = `
                          INSERT 
                              projection 
                          SET 
                              repertoire_id = ?, 
                              starts_at = ?, 
                              ends_at = ?, 
                              cinema_id = ?, 
                              movie_id = ?;`;

        let date: Date = new Date(data.startsAt);

        for (const projection of data.projections) {
          const movie = await this.services.movieService.getById(
            projection.movieId
          );

          const startsAt: Date = date;

          const min: number = movie.duration + 10 + 15;

          date = this.addMinutes(date, min);

          const endsAt: Date = date;

          if (Number.isInteger(projection.projectionId)) {
            await this.db.execute(updateQuery, [
              startsAt,
              endsAt,
              projection.cinemaId,
              projection.movieId,
              id,
            ]);
          } else {
            await this.db.execute(insertQuery, [
              id,
              startsAt,
              endsAt,
              projection.cinemaId,
              projection.movieId,
            ]);
          }
        }

        await this.db.commit();

        resolve(
          await this.getById(id, {
            loadProjections: true,
          })
        );
      } catch (error) {
        await this.db.rollback();

        console.log(error.errno);
        console.log(error.message);

        if (error?.errno === 1062) {
          reject(
            new ApiError(
              "FAILED_ADDING_REPERTOIRE",
              `Repertoire for '${new Date(data.startsAt).toLocaleDateString(
                "sr-RS"
              )}' already exists.`
            )
          );
        }

        reject(
          new ApiError(
            "FAILED_ADDING_REPERTOIRE",
            "Failed adding new repertoire."
          )
        );
      }
    });
  }

  private addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  private toDateString(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
