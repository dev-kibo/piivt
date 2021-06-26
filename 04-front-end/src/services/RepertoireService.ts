import api from "../api/api";
import RepertioreModel from "../../../03-back-end/src/components/repertoire/model";
import IAddRepertoire from "../../../03-back-end/src/components/repertoire/dto/IAddRepertoire";
import { ApiResponse } from "../api/api";
import RepertoireModel from "../../../03-back-end/src/components/repertoire/model";
import IDeleteProjection from "../../../03-back-end/src/components/projection/dto/IDeleteProjection";

export default class RepertoireService {
  public static async getAll(): Promise<RepertioreModel[]> {
    return new Promise<RepertioreModel[]>(async (resolve, reject) => {
      try {
        const res = await api("get", "/repertoires");
        resolve(res.data as RepertoireModel[]);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async getById(id: number): Promise<RepertioreModel> {
    return new Promise<RepertioreModel>(async (resolve, reject) => {
      try {
        const res = await api("get", `/repertoires/${id}`);
        resolve(res.data as RepertoireModel);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async getRepertoireByDate(
    date: string
  ): Promise<RepertioreModel | null> {
    return new Promise<RepertioreModel | null>(async (resolve, reject) => {
      try {
        const res = await api("get", `/repertoires/date/${date}`);
        resolve(res.data as RepertioreModel);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async add(data: IAddRepertoire): Promise<RepertioreModel> {
    return new Promise<RepertioreModel>(async (resolve, reject) => {
      try {
        const res = await api("post", "/repertoires", data);

        resolve(res.data as RepertioreModel);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async addOrUpdate(
    repertoireId: number,
    data: IAddRepertoire
  ): Promise<RepertioreModel> {
    return new Promise<RepertioreModel>(async (resolve, reject) => {
      try {
        const res = await api("put", `/repertoires/${repertoireId}`, data);

        resolve(res.data as RepertioreModel);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async deleteProjections(
    repertoireId: number,
    data: IDeleteProjection[]
  ): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const res = await api(
          "delete",
          `/repertoires/${repertoireId}/projections`,
          data
        );

        resolve(res.status);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }
}
