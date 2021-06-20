import api from "../api/api";
import RepertioreModel from "../../../03-back-end/src/components/repertoire/model";

export default class RepertoireService {
  public static async GetRepertoire(
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
}
