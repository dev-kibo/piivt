import BaseService from "../../common/BaseService";
import IErrorResponse from "../../common/IErrorResponse.interface";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import RoleModel from "./model";

export default class RoleService extends BaseService<RoleModel> {
  protected async adaptModel(
    data: any,
    options: Partial<IModelAdapterOptionsInterface> = {}
  ): Promise<RoleModel> {
    const model = new RoleModel();

    model.roleId = +data?.movie_actor_id;
    model.role = data?.role_name;
    model.actor = {
      actorId: data?.actor_id,
      firstName: data?.first_name,
      middleName: data?.middle_name,
      lastName: data?.last_name,
    };

    return model;
  }

  public async getAllRolesForMovie(id: number): Promise<RoleModel[] | null> {
    const movie = await this.services.movieService.getById(id);

    if (movie === null) {
      return null;
    }

    return new Promise<RoleModel[]>(async (resolve, reject) => {
      try {
        const query: string = `
        SELECT
            movie_actor.movie_actor_id,
            movie_actor.role_name,
            actor.actor_id,
            actor.first_name,
            actor.middle_name,
            actor.last_name
        FROM
            movie_actor
            INNER JOIN actor ON movie_actor.actor_id = actor.actor_id
        WHERE
            movie_id = ?;`;

        const [rows] = await this.db.execute(query, [id]);

        if (!Array.isArray(rows)) {
          return resolve(null);
        }

        if (rows.length === 0) {
          return resolve(null);
        }

        const roles: RoleModel[] = [];

        if (Array.isArray(roles)) {
          for (const row of rows) {
            roles.push(await this.adaptModel(row));
          }

          resolve(roles);
        }
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
