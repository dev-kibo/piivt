import IRouter from "../../common/IRouter.interface";
import { Application } from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import CinemaController from "./controller";

export default class CinemaRouter implements IRouter {
  public setupRoutes(
    application: Application,
    resources: IApplicationResources
  ) {
    const cinemaController: CinemaController = new CinemaController(resources);

    application.get("/cinemas", cinemaController.getAll.bind(cinemaController));
    application.get(
      "/cinemas/search/:search",
      cinemaController.getAllBySearchTerm.bind(cinemaController)
    );
    application.get(
      "/cinemas/:id",
      cinemaController.getById.bind(cinemaController)
    );
    application.post("/cinemas", cinemaController.add.bind(cinemaController));
    application.put(
      "/cinemas/:id",
      cinemaController.update.bind(cinemaController)
    );
  }
}
