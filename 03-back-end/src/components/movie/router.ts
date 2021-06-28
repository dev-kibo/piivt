import IRouter from "../../common/IRouter.interface";
import { Application } from "express";
import IApplicationResourcesInterface from "../../common/IApplicationResources.interface";
import MovieController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

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
      movieController.getMovieRoles.bind(movieController)
    );
    application.post(
      "/movies",
      AuthMiddleware.verifyAuthToken,
      movieController.add.bind(movieController)
    );
    application.put(
      "/movies/:id",
      AuthMiddleware.verifyAuthToken,
      movieController.update.bind(movieController)
    );
    application.put(
      "/movies/:id/roles",
      AuthMiddleware.verifyAuthToken,
      movieController.updateRoles.bind(movieController)
    );
    application.delete(
      "/movies/:id/roles",
      AuthMiddleware.verifyAuthToken,
      movieController.deleteRoles.bind(movieController)
    );
    application.delete(
      "/movies/:id",
      AuthMiddleware.verifyAuthToken,
      movieController.delete.bind(movieController)
    );
  }
}
