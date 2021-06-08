import BaseService from "../../common/BaseService";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import { IAddRepertoire } from "./dto/IAddRepertoire";
import RepertoireModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import MovieModel from "../movie/model";
import CinemaModel from "../cinema/model";

class RepertoireModelAdapterOptions implements IModelAdapterOptionsInterface {
  loadProjections: boolean;
}

export default class RepertoireService extends BaseService<RepertoireModel> {
  protected async adaptModel(
    data: any,
    options: Partial<RepertoireModelAdapterOptions>
  ): Promise<RepertoireModel> {
    const model = new RepertoireModel();

    model.date = data?.date_at;
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

  public async getById(
    id: number,
    options: RepertoireModelAdapterOptions = { loadProjections: true }
  ): Promise<RepertoireModel> | null {
    return await this.getByIdFromTable("repertoire", id, options);
  }

  public async add(data: IAddRepertoire): Promise<RepertoireModel> {
    return new Promise<RepertoireModel>(async (resolve, reject) => {
      let error: IErrorResponse = { code: 0, description: "" };

      if (isNaN(Date.parse(data.startsAt))) {
        error.code = 99400;
        error.description = "Invalid date format.";
        return reject(error);
      }

      if (new Date(data.startsAt).getTime() < Date.now()) {
        error.code = 99400;
        error.description = "Projection can't start in past time.";
        return reject(error);
      }

      for (const projection of data.projections) {
        const movie: MovieModel | null =
          await this.services.movieService.getById(projection.movieId);
        const cinema: CinemaModel | null =
          await this.services.cinemaService.getById(projection.cinemaId);

        if (movie === null) {
          error.code = 99400;
          error.description = `Movie with id ${projection.movieId} doesn't exist.`;
          return reject(error);
        }

        if (cinema === null) {
          error.code = 99400;
          error.description = `Cinema with id ${projection.movieId} doesn't exist.`;
          return reject(error);
        }
      }

      try {
        await this.db.beginTransaction();

        const query: string = "INSERT repertoire SET date_at = ?;";

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

        const e: IErrorResponse = {
          code: error?.errno,
          description: error?.message,
        };
        reject(e);
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
