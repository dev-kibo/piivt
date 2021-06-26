import CinemaModel from "../../../../03-back-end/src/components/cinema/model";

export default interface IHomePageStateMoviesProjections {
  id: number;
  cinema: CinemaModel;
  startsAt: string;
  endsAt: string;
}
