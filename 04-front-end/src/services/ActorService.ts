import IAddActor from "../../../03-back-end/src/components/actor/dto/IAddActor";
import ActorModel from "../../../03-back-end/src/components/actor/model";
import { ApiResponse } from "../api/api";
import api from "../api/api";

export default class ActorService {
  public static async getById(id: number): Promise<ActorModel> {
    return new Promise<ActorModel>(async (resolve, reject) => {
      const res = await api("get", `/actors/${id}`);

      resolve(res.data as ActorModel);
    });
  }

  public static async getAll(): Promise<ActorModel[]> {
    return new Promise<ActorModel[]>(async (resolve, reject) => {
      try {
        const res = await api("get", "/actors");
        resolve(res.data as ActorModel[]);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async search(query: string): Promise<ActorModel[]> {
    return new Promise<ActorModel[]>(async (resolve, reject) => {
      try {
        const res = await api("get", `/actors/search/${query}`);
        resolve(res.data as ActorModel[]);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async add(data: IAddActor): Promise<ActorModel> {
    return new Promise<ActorModel>(async (resolve, reject) => {
      try {
        const res = await api("post", "/actors", data);

        resolve(res.data as ActorModel);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async editActor(
    id: number,
    data: IAddActor
  ): Promise<ActorModel> {
    return new Promise<ActorModel>(async (resolve, reject) => {
      try {
        const res = await api("put", `/actors/${id}`, data);
        resolve(res.data as ActorModel);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }
}
