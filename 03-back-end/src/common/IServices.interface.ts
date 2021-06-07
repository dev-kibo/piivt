import CinemaService from "../components/cinema/service";
import ActorService from "../components/actor/service";
import MovieService from "../components/movie/service";
import RoleService from "../components/role/service";
export default interface IServices {
  cinemaService: CinemaService;
  actorService: ActorService;
  movieService: MovieService;
  roleService: RoleService;
}
