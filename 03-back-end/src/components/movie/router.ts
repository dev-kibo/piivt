import IRouter from "../../common/IRouter.interface";
import { Application } from "express";
import IApplicationResourcesInterface from "../../common/IApplicationResources.interface";
import MovieController from "./controller";

export default class MovieRouter implements IRouter {
  setupRoutes(
    application: Application,
    resources: IApplicationResourcesInterface
  ) {
    const movieController: MovieController = new MovieController(resources);

    application.get("/movies", movieController.getAll.bind(movieController));
    application.get(
      "/movies/:id",
      movieController.getById.bind(movieController)
    );
    application.get(
      "/movies/:id/roles",
      movieController.getAllWithRoles.bind(movieController)
    );
    application.post("/movies", movieController.add.bind(movieController));
    application.put(
      "/movies/:id",
      movieController.update.bind(movieController)
    );
    application.put(
      "/movies/:id/roles",
      movieController.updateRoles.bind(movieController)
    );
    application.delete(
      "/movies/:id/roles",
      movieController.deleteRoles.bind(movieController)
    );
    application.delete(
      "/movies/:id",
      movieController.delete.bind(movieController)
    );
  }
}
