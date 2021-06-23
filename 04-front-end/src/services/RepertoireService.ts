import api from "../api/api";
import RepertioreModel from "../../../03-back-end/src/components/repertoire/model";
import IAddRepertoire from "../../../03-back-end/src/components/repertoire/dto/IAddRepertoire";
import { ApiResponse } from "../api/api";

export default class RepertoireService {
  public static async getRepertoire(
    date: string
  ): Promise<RepertioreModel | null> {
    return new Promise<RepertioreModel | null>(async (resolve, reject) => {
      const dateFilter = new Date(date).toISOString();
      try {
        const res = await api("get", `/repertoires?date=${dateFilter}`);
        resolve(res.data as RepertioreModel);
      } catch (error) {
        console.log(error);
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
}
