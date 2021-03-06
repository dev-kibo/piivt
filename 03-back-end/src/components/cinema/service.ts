import BaseService from "../../common/BaseService";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import IAddCinema from "./dto/IAddCinema";
import CinemaModel from "./model";
import { IUpdateCinema } from "./dto/IUpdateCinema";
import ApiError from "../error/ApiError";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";

export default class CinemaService extends BaseService<CinemaModel> {
  protected async adaptModel(
    row: any,
    options: Partial<IModelAdapterOptionsInterface>
  ): Promise<CinemaModel> {
    const model = new CinemaModel();

    model.cinemaId = +row?.cinema_id;
    model.name = row?.name;

    return model;
  }

  public async getAll(
    searchTerm?: string,
    options: Partial<IModelAdapterOptionsInterface> = {}
  ): Promise<CinemaModel[]> {
    if (!searchTerm || searchTerm.length === 0) {
      return await this.getAllFromTable<IModelAdapterOptionsInterface>(
        "cinema",
        options
      );
    } else {
      return await this.getAllBySearchTerm(searchTerm);
    }
  }

  public async getById(
    id: number,
    options: Partial<IModelAdapterOptionsInterface> = {}
  ): Promise<CinemaModel | null> {
    return await this.getByIdFromTable<IModelAdapterOptionsInterface>(
      "cinema",
      id,
      options
    );
  }

  public async getAllBySearchTerm(
    searchTerm: string,
    options: IModelAdapterOptions = {}
  ): Promise<CinemaModel[]> {
    return new Promise<CinemaModel[]>(async (resolve, reject) => {
      const query: string =
        "SELECT * FROM cinema WHERE LOWER(name) LIKE CONCAT('%', ?, '%') AND is_deleted = 0;";

      try {
        const [rows] = await this.db.execute(query, [searchTerm.toLowerCase()]);

        const res: CinemaModel[] = [];

        if (Array.isArray(rows)) {
          for (const row of rows) {
            res.push(await this.adaptModel(row, options));
          }
        }

        resolve(res);
      } catch (error) {
        reject(new ApiError("CINEMA_SEARCH_FAILED", "Failed cinema search."));
      }
    });
  }

  public async add(data: IAddCinema): Promise<CinemaModel> {
    return new Promise<CinemaModel>(async (resolve, reject) => {
      const query: string = "INSERT cinema SET name = ?;";

      try {
        const result = await this.db.execute(query, [data.name]);

        const insertInfo: any = result[0];

        resolve(await this.getById(+insertInfo?.insertId));
      } catch (error) {
        reject(
          new ApiError(
            "CINEMA_EXISTS",
            `Cinema with name '${data.name}' already exists.`
          )
        );
      }
    });
  }

  public async update(
    data: IUpdateCinema,
    id: number
  ): Promise<CinemaModel> | null {
    const cinema: CinemaModel | null = await this.getById(id);

    if (cinema === null) {
      return null;
    }

    return new Promise<CinemaModel>(async (resolve, reject) => {
      const query: string = "UPDATE cinema SET name = ? WHERE cinema_id = ?;";

      try {
        await this.db.execute(query, [data.name, id]);

        resolve(await this.getById(id));
      } catch (error) {
        reject(
          new ApiError("CINEMA_UPDATE_FAILED", "Update of cinema failed.")
        );
      }
    });
  }

  public async delete(id: number): Promise<boolean> | null {
    if (!(await this.getById(id))) {
      return null;
    }

    return new Promise(async (resolve, reject) => {
      const updateQuery: string =
        "UPDATE cinema SET is_deleted = 1 WHERE cinema_id = ?;";

      const searchQuery: string =
        "SELECT * FROM projection WHERE cinema_id = ? AND DATEDIFF(starts_at, CURRENT_DATE) >= 0;";

      try {
        const [rows] = await this.db.execute(searchQuery, [id]);

        if (Array.isArray(rows) && rows.length > 0) {
          return reject(
            new ApiError(
              "CINEMA_IN_USE",
              "Cinema is used in future projection."
            )
          );
        }

        await this.db.execute(updateQuery, [id]);

        resolve(true);
      } catch (error) {
        reject(new ApiError("DELETE_FAILED", "Failed deleting cinema."));
      }
    });
  }
}
