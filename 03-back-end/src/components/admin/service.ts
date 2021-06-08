import BaseService from "../../common/BaseService";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import AdminModel from "./model";
import * as bcrypt from "bcrypt";
import { IAddAdmin } from "./dto/IAddAdmin";
import IErrorResponse from "../../common/IErrorResponse.interface";

export default class AdminService extends BaseService<AdminModel> {
  protected async adaptModel(
    data: any,
    options: Partial<IModelAdapterOptionsInterface>
  ): Promise<AdminModel> {
    const model: AdminModel = new AdminModel();

    model.adminId = +data?.admin_id;
    model.email = data?.email;
    model.passwordHash = data?.password_hash;
    model.refreshToken = data?.refresh_token;
    model.createdAt = data?.created_at;

    return model;
  }

  public async getById(id: number): Promise<AdminModel> | null {
    return await this.getByIdFromTable("admin", id);
  }

  public async getByEmail(
    email: string,
    options: IModelAdapterOptionsInterface = {}
  ): Promise<AdminModel | null> {
    return new Promise<AdminModel>(async (resolve, reject) => {
      const query: string = "SELECT * FROM admin WHERE email = ?;";

      try {
        const [rows] = await this.db.execute(query, [email]);

        if (!Array.isArray(rows)) {
          return resolve(null);
        }

        if (rows.length === 0) {
          return resolve(null);
        }

        resolve(await this.adaptModel(rows[0], options));
      } catch (error) {
        const e: IErrorResponse = {
          code: +error?.errno,
          description: error?.message,
        };
        reject(e);
      }
    });
  }

  public async add(data: IAddAdmin): Promise<AdminModel> {
    return new Promise<AdminModel>(async (resolve, reject) => {
      const passwordHash = bcrypt.hashSync(data.password, 11);

      try {
        const result = await this.db.execute(
          `INSERT admin SET email = ?, password_hash = ?;`,
          [data.email, passwordHash]
        );

        const insertInfo: any = result[0];

        resolve(await this.getById(+insertInfo?.insertId));
      } catch (error) {
        const e: IErrorResponse = {
          code: +error?.errno,
          description: error?.message,
        };
        reject(error);
      }
    });
  }
}
