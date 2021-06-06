import BaseService from "../../common/BaseService";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import { IAddCinema } from "./dto/IAddCinema";
import CinemaModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IUpdateCinema } from "./dto/IUpdateCinema";

class CinemaModelAdapterOptions implements IModelAdapterOptionsInterface {}

export default class CinemaService extends BaseService<CinemaModel> {
  protected async adaptModel(
    row: any,
    options: Partial<CinemaModelAdapterOptions>
  ): Promise<CinemaModel> {
    const model = new CinemaModel();

    model.cinemaId = +row?.cinema_id;
    model.name = row?.name;

    return model;
  }

  public async getAll(
    options: Partial<CinemaModelAdapterOptions> = {}
  ): Promise<CinemaModel[]> {
    return await this.getAllFromTable<CinemaModelAdapterOptions>(
      "cinema",
      options
    );
  }

  public async getById(
    id: number,
    options: Partial<CinemaModelAdapterOptions> = {}
  ): Promise<CinemaModel | null> {
    return await this.getByIdFromTable<CinemaModelAdapterOptions>(
      "cinema",
      id,
      options
    );
  }

  public async add(data: IAddCinema): Promise<CinemaModel> {
    return new Promise<CinemaModel>(async (resolve, reject) => {
      const query: string = "INSERT cinema SET name = ?;";

      try {
        const result = await this.db.execute(query, [data.name]);

        const insertInfo: any = result[0];

        resolve(await this.getById(+insertInfo?.insertId));
      } catch (error) {
        const e: IErrorResponse = {
          code: error?.errno,
          description: error?.message,
        };

        reject(e);
      }
    });
  }

  public async update(
    data: IUpdateCinema,
    id: number,
    options: Partial<CinemaModelAdapterOptions> = {}
  ): Promise<CinemaModel | null> {
    const cinema: CinemaModel | null = await this.getById(id);

    if (cinema === null) {
      return null;
    }

    return new Promise<CinemaModel>(async (resolve, reject) => {
      const query: string = "UPDATE cinema SET name = ? WHERE cinema_id = ?;";

      try {
        await this.db.execute(query, [data.name, id]);

        resolve(await this.getById(id, options));
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
