import CinemaModel from "../../../03-back-end/src/components/cinema/model";
import IAddCinema from "../../../03-back-end/src/components/cinema/dto/IAddCinema";
import api from "../api/api";
import { ApiResponse } from "../api/api";

export default class CinemaService {
  public static async getCinemaById(id: number): Promise<CinemaModel> {
    return new Promise<CinemaModel>(async (resolve, reject) => {
      const res = await api("get", `/cinemas/${id}`);

      resolve(res.data as CinemaModel);
    });
  }

  public static async getAllCinemas(): Promise<CinemaModel[]> {
    return new Promise<CinemaModel[]>(async (resolve, reject) => {
      try {
        const res = await api("get", "/cinemas");
        resolve(res.data as CinemaModel[]);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async searchCinemas(
    searchTerm: string
  ): Promise<CinemaModel[]> {
    return new Promise<CinemaModel[]>(async (resolve, reject) => {
      try {
        const res = await api("get", `/cinemas/search/${searchTerm}`);
        resolve(res.data as CinemaModel[]);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async addCinema(data: IAddCinema): Promise<CinemaModel> {
    return new Promise<CinemaModel>(async (resolve, reject) => {
      try {
        const res = await api("post", "/cinemas", data);
        resolve(res.data as CinemaModel);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async editCinema(
    id: number,
    data: IAddCinema
  ): Promise<CinemaModel> {
    return new Promise<CinemaModel>(async (resolve, reject) => {
      try {
        const res = await api("put", `/cinemas/${id}`, data);
        resolve(res.data as CinemaModel);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async deleteCinema(id: number): Promise<ApiResponse> {
    return new Promise<ApiResponse>(async (resolve, reject) => {
      try {
        const res = await api("delete", `/cinemas/${id}`);
        resolve(res.data as ApiResponse);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }
}
