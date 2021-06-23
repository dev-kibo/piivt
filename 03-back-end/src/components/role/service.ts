import BaseService from "../../common/BaseService";
import { IAddRole } from "./dto/IAddRole";
import RoleModel from "./model";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import ApiError from "../error/ApiError";
import { IUpdateRole } from "./dto/IUpdateRole";

class RoleModelAdapterOptions implements IModelAdapterOptions {
  loadActor: boolean;
}

export default class RoleService extends BaseService<RoleModel> {
  protected async adaptModel(
    data: any,
    options: Partial<RoleModelAdapterOptions> = {}
  ): Promise<RoleModel> {
    const model = new RoleModel();

    model.roleId = +data?.movie_actor_id;
    model.role = data?.role_name;

    if (options.loadActor) {
      model.actor = await this.services.actorService.getById(data?.actor_id);
    }

    return model;
  }

  public async getById(
    id: number,
    options: RoleModelAdapterOptions = { loadActor: true }
  ): Promise<RoleModel | null> {
    return await this.getByIdFromTable("movie_actor", id, options);
  }

  public async getAllRolesForMovie(
    id: number,
    options: RoleModelAdapterOptions = { loadActor: true }
  ): Promise<RoleModel[] | null> | null {
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
            roles.push(await this.adaptModel(row, options));
          }

          resolve(roles);
        }
      } catch (error) {
        reject(
          new ApiError(
            "FAILED_FETCHING_ROLES",
            "Failed getting roles for the movie."
          )
        );
      }
    });
  }

  public async add(data: IAddRole): Promise<RoleModel> {
    return new Promise<RoleModel>(async (resolve, reject) => {
      if (!(await this.services.actorService.getById(data.actorId))) {
        return reject(
          new ApiError(
            "ACTOR_NOT_FOUND",
            `Actor with id '${data.actorId}' not found.`
          )
        );
      }

      if (!(await this.services.movieService.getById(data.movieId))) {
        return reject(
          new ApiError(
            "MOVIE_NOT_FOUND",
            `Movie with id '${data.movieId}' not found.`
          )
        );
      }

      const insertQuery =
        "INSERT movie_actor SET movie_id = ?, actor_id = ?, role_name = ?;";

      try {
        const result = await this.db.execute(insertQuery, [
          data.movieId,
          data.actorId,
          data.role,
        ]);

        const insertInfo: any = result[0];
        resolve(await this.getById(+insertInfo?.insertId));
      } catch (error) {
        reject(new ApiError("ROLE_ADD_FAILED", "Failed adding new role."));
      }
    });
  }

  public async update(
    id: number,
    data: IUpdateRole
  ): Promise<RoleModel> | null {
    if (!(await this.getById(id))) {
      return null;
    }
    return new Promise<RoleModel>(async (resolve, reject) => {
      const query =
        "UPDATE movie_actor SET role_name = ? WHERE movie_actor_id = ?;";

      try {
        await this.db.execute(query, [data.role, id]);

        resolve(await this.getById(id));
      } catch (error) {
        console.log(error.message);
        reject(new ApiError("ROLE_UPDATE_FAILED", "Failed updating role."));
      }
    });
  }

  public async delete(id: number): Promise<boolean> | null {
    if (!(await this.getById(id))) {
      return null;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const query: string =
          "UPDATE movie_actor SET is_deleted = 1 WHERE movie_actor_id = ?;";
        const result = await this.db.execute(query, [id]);

        resolve(true);
      } catch (error) {
        reject(new ApiError("DELETE_FAILED", "Failed deleting role."));
      }
    });
  }
}
