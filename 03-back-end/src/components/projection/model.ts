import IModel from "../../common/IModel.interface";

export default class ProjectionModel implements IModel {
  projectionId: number;
  cinemaId: number;
  movieId: number;
  startsAt: string;
  endsAt: string;
}
