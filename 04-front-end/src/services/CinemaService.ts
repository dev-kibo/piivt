import CinemaModel from "../../../03-back-end/src/components/cinema/model";
import api from "../api/api";

export default class CinemaService {
  public static async getCinemaById(id: number): Promise<CinemaModel> {
    return new Promise<CinemaModel>(async (resolve, reject) => {
      const res = await api("get", `/cinemas/${id}`);

      resolve(res.data as CinemaModel);
    });
  }
}
