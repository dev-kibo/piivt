import IModel from "../../common/IModel.interface";
import RoleModel from "../role/model";

export default class MovieModel implements IModel {
  movieId: number;
  title: string;
  releasedAt: string; // yyyy-mm-dd
  description: string;
  posterUrl: string;
  duration: number;
  roles?: RoleModel[];
}
