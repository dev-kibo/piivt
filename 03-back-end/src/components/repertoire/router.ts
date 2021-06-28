import IRouter from "../../common/IRouter.interface";
import { Application } from "express";
import IApplicationResourcesInterface from "../../common/IApplicationResources.interface";
import RepertoireController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class RepertoireRouter implements IRouter {
  setupRoutes(
    application: Application,
    resources: IApplicationResourcesInterface
  ) {
    const repController = new RepertoireController(resources);

    application.get("/repertoires", repController.getAll.bind(repController));
    application.get(
      "/repertoires/:id",
      repController.getById.bind(repController)
    );
    application.get(
      "/repertoires/date/:date",
      repController.getByDate.bind(repController)
    );
    application.post(
      "/repertoires",
      AuthMiddleware.verifyAuthToken,
      repController.add.bind(repController)
    );
    application.put(
      "/repertoires/:id",
      AuthMiddleware.verifyAuthToken,
      repController.update.bind(repController)
    );
    application.delete(
      "/repertoires/:id/projections",
      AuthMiddleware.verifyAuthToken,
      repController.delete.bind(repController)
    );
  }
}
