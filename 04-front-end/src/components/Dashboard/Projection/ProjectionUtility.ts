import CinemaModel from "../../../../../03-back-end/src/components/cinema/model";
import MovieModel from "../../../../../03-back-end/src/components/movie/model";
import ProjectionModel from "../../../../../03-back-end/src/components/projection/model";
import CinemaService from "../../../services/CinemaService";
import MovieService from "../../../services/MovieService";
import IData from "./IData";

export default class ProjectionUtility {
  public static async mapData(data: ProjectionModel[]): Promise<IData[]> {
    return new Promise<IData[]>(async (resolve) => {
      const mappedData: IData[] = [];

      for (const result of data) {
        const movie: MovieModel = await MovieService.getMovieById(
          result.movieId
        );
        const cinema: CinemaModel = await CinemaService.getCinemaById(
          result.cinemaId
        );

        mappedData.push({
          cinema,
          movie,
          startsAt: result.startsAt,
          endsAt: result.endsAt,
          projectionId: result.projectionId,
        });
      }

      resolve(mappedData);
    });
  }

  public static async mapSingleData(data: ProjectionModel): Promise<IData> {
    return new Promise<IData>(async (resolve) => {
      const movie: MovieModel = await MovieService.getMovieById(data.movieId);
      const cinema: CinemaModel = await CinemaService.getCinemaById(
        data.cinemaId
      );

      resolve({
        cinema,
        movie,
        startsAt: data.startsAt,
        endsAt: data.endsAt,
        projectionId: data.projectionId,
      } as IData);
    });
  }
}
