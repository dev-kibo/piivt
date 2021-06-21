import CinemaModel from "../../../../../03-back-end/src/components/cinema/model";
import MovieModel from "../../../../../03-back-end/src/components/movie/model";

export default interface IData {
  cinema: CinemaModel;
  movie: MovieModel;
  startsAt: string;
  endsAt: string;
  projectionId: number;
}
