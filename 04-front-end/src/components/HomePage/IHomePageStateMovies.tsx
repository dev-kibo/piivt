import MovieModel from "../../../../03-back-end/src/components/movie/model";
import IHomePageStateMoviesProjections from "./IHomePageStateMoviesProjections";

export default interface IHomePageStateMovies {
  movie: MovieModel;
  projections: IHomePageStateMoviesProjections[];
}
