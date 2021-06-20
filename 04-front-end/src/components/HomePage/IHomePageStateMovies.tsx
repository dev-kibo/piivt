import CinemaModel from "../../../../03-back-end/src/components/cinema/model";
import MovieModel from "../../../../03-back-end/src/components/movie/model";

export default interface IHomePageStateMovies {
  movie: MovieModel;
  projections: {
    id: number;
    cinema: CinemaModel;
    startsAt: string;
    endsAt: string;
  }[];
}
