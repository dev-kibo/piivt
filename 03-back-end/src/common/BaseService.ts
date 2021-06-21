import IModel from "./IModel.interface";
import IApplicationResources from "./IApplicationResources.interface";
import * as mysql2 from "mysql2/promise";
import IServices from "./IServices.interface";
import IModelAdapterOptions from "./IModelAdapterOptions.interface";
import ApiError from "../components/error/ApiError";

export default abstract class BaseService<ReturnModel extends IModel> {
  private resources: IApplicationResources;

  constructor(resources: IApplicationResources) {
    this.resources = resources;
  }

  protected get db(): mysql2.Connection {
    return this.resources.databaseConnection;
  }

  protected get services(): IServices {
    return this.resources.services;
  }

  protected abstract adaptModel(
    data: any,
    options: Partial<IModelAdapterOptions>
  ): Promise<ReturnModel>;

  protected async getAllFromTable<AdapterOptions extends IModelAdapterOptions>(
    tableName: string,
    options: Partial<AdapterOptions> = {}
  ): Promise<ReturnModel[]> {
    return new Promise<ReturnModel[]>(async (resolve, reject) => {
      const query: string = `SELECT * FROM ${tableName} WHERE is_deleted = 0;`;

      try {
        const [rows] = await this.db.execute(query);

        const response: ReturnModel[] = [];

        if (Array.isArray(rows)) {
          for (const row of rows) {
            response.push(await this.adaptModel(row, options));
          }
        }

        resolve(response);
      } catch (error) {
        reject(
          new ApiError("FAILED_FETCH", "Failed getting all from the database.")
        );
      }
    });
  }

  protected async getByIdFromTable<AdapterOptions extends IModelAdapterOptions>(
    tableName: string,
    id: number,
    options: Partial<AdapterOptions> = {}
  ): Promise<ReturnModel | null> {
    return new Promise<ReturnModel | null>(async (resolve, reject) => {
      const query: string = `SELECT * FROM ${tableName} WHERE ${tableName}_id = ? AND is_deleted = 0;`;

      try {
        const [rows] = await this.db.execute(query, [id]);

        if (!Array.isArray(rows)) {
          return resolve(null);
        }

        if (rows.length === 0) {
          return resolve(null);
        }

        resolve(await this.adaptModel(rows[0], options));
      } catch (error) {
        reject(
          new ApiError(
            "FETCH_FAILED",
            "Failed getting from the database by id."
          )
        );
      }
    });
  }
}
