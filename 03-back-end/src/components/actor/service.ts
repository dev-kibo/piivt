import BaseService from "../../common/BaseService";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import ActorModel from "./model";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IAddActor } from "./dto/IAddActor";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IUpdateActor } from "./dto/IUpdateActor";

class ActorModelAdapterOptions implements IModelAdapterOptions {}

export default class ActorService extends BaseService<ActorModel> {
  protected async adaptModel(
    data: any,
    options: Partial<IModelAdapterOptionsInterface>
  ): Promise<ActorModel> {
    const model = new ActorModel();

    model.actorId = +data?.actor_id;
    model.firstName = data?.first_name;
    model.middleName = data?.middle_name;
    model.lastName = data?.last_name;

    return model;
  }

  public async getAll(
    options: Partial<ActorModelAdapterOptions> = {}
  ): Promise<ActorModel[]> {
    return await this.getAllFromTable("actor", options);
  }

  public async getById(
    id: number,
    options: Partial<ActorModelAdapterOptions> = {}
  ): Promise<ActorModel | null> {
    return await this.getByIdFromTable("actor", id, options);
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
        const e: IErrorResponse = {
          code: error?.errno,
          description: error?.message,
        };
        reject(e);
      }
    });
  }

  public async update(
    data: IUpdateActor,
    id: number
  ): Promise<ActorModel | null> {
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
        const e: IErrorResponse = {
          code: error?.errno,
          description: error?.message,
        };
        reject(e);
      }
    });
  }
}
