export default interface IMoviePageProjectionsState {
  cinemaId: number;
  cinemaName: string;
  projections: {
    projectionId: number;
    startsAt: string;
  }[];
}
