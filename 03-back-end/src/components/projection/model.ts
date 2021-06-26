import IModel from "../../common/IModel.interface";
import MovieModel from "../movie/model";
import CinemaModel from "../cinema/model";

export default class ProjectionModel implements IModel {
  projectionId: number;
  cinema?: CinemaModel;
  movie?: MovieModel;
  startsAt: string;
  endsAt: string;
}
