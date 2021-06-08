import CinemaService from "../components/cinema/service";
import ActorService from "../components/actor/service";
import MovieService from "../components/movie/service";
import RoleService from "../components/role/service";
import ProjectionService from "../components/projection/service";
import RepertoireService from "../components/repertoire/service";
import AdminService from "../components/admin/service";

export default interface IServices {
  cinemaService: CinemaService;
  actorService: ActorService;
  movieService: MovieService;
  roleService: RoleService;
  projectionService: ProjectionService;
  repertoireService: RepertoireService;
  adminService: AdminService;
}
