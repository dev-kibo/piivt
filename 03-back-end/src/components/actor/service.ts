import BaseService from "../../common/BaseService";
import ActorModel from "./model";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import IAddActor from "./dto/IAddActor";
import { IUpdateActor } from "./dto/IUpdateActor";
import ApiError from "../error/ApiError";

export default class ActorService extends BaseService<ActorModel> {
  protected async adaptModel(
    data: any,
    options: Partial<IModelAdapterOptions>
  ): Promise<ActorModel> {
    const model = new ActorModel();

    model.actorId = +data?.actor_id;
    model.firstName = data?.first_name;
    model.middleName = data?.middle_name;
    model.lastName = data?.last_name;

    return model;
  }

  public async getAll(
    options: Partial<IModelAdapterOptions> = {}
  ): Promise<ActorModel[]> {
    return await this.getAllFromTable("actor", options);
  }

  public async getById(
    id: number,
    options: Partial<IModelAdapterOptions> = {}
  ): Promise<ActorModel | null> {
    return await this.getByIdFromTable("actor", id, options);
  }

  public async getAllBySearchTerm(
    searchTerm: string,
    options: IModelAdapterOptions = {}
  ): Promise<ActorModel[]> {
    return new Promise<ActorModel[]>(async (resolve, reject) => {
      const query: string = `
          SELECT 
              * 
          FROM 
              actor 
          WHERE 
              LOWER(first_name) LIKE CONCAT('%', ?, '%') AND
              is_deleted = 0;`;

      try {
        const [rows] = await this.db.execute(query, [searchTerm.toLowerCase()]);

        const res: ActorModel[] = [];

        if (Array.isArray(rows)) {
          for (const row of rows) {
            res.push(await this.adaptModel(row, options));
          }
        }

        resolve(res);
      } catch (error) {
        reject(new ApiError("ACTOR_SEARCH_FAILED", "Failed actor search."));
      }
    });
  }

  public async add(data: IAddActor): Promise<ActorModel> {
    return new Promise<ActorModel>(async (resolve, reject) => {
      const query: string =
        "INSERT actor SET first_name = ?, middle_name = ?, last_name = ?;";

      try {
        const result = await this.db.execute(query, [
          data.firstName,
          data.middleName ?? null,
          data.lastName,
        ]);

        const insertInfo: any = result[0];

        resolve(await this.getById(+insertInfo?.insertId));
      } catch (error) {
        reject(
          new ApiError(
            "ACTOR_ALREADY_EXISTS",
            `Actor with name '${data.firstName} ${data.middleName ?? ""} ${
              data.lastName
            }' already exists.`
          )
        );
      }
    });
  }

  public async update(
    data: IUpdateActor,
    id: number
  ): Promise<ActorModel> | null {
    const actor: ActorModel | null = await this.getById(id);

    if (actor === null) {
      return null;
    }

    return new Promise<ActorModel>(async (resolve, reject) => {
      const query: string =
        "UPDATE actor SET first_name = ?, middle_name = ?, last_name = ? WHERE actor_id = ?;";

      try {
        await this.db.execute(query, [
          data.firstName,
          data.middleName ?? null,
          data.lastName,
          id,
        ]);

        resolve(await this.getById(id));
      } catch (error) {
        if (error?.errno === 1062) {
          return reject(
            new ApiError(
              "ACTOR_ALREADY_EXISTS",
              `Actor with name '${data.firstName} ${data.middleName ?? ""} ${
                data.lastName
              }' already exists.`
            )
          );
        }

        reject(new ApiError("ACTOR_UPDATE_FAILED", "Updating actor failed."));
      }
    });
  }
}
