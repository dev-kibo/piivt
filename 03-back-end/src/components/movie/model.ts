import IModel from "../../common/IModel.interface";

export default class MovieModel implements IModel {
  movieId: number;
  title: string;
  releasedAt: Date; // yyyy-mm-dd
  description: string;
  posterUrl: string;
  duration: number;
}
