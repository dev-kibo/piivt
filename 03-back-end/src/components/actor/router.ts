import { Application } from "express";
import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import ActorController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class ActorRouter implements IRouter {
  setupRoutes(application: Application, resources: IApplicationResources) {
    const actorController: ActorController = new ActorController(resources);

    application.get("/actors", actorController.getAll.bind(actorController));
    application.get(
      "/actors/:id",
      actorController.getById.bind(actorController)
    );
    application.post(
      "/actors",
      AuthMiddleware.verifyAuthToken,
      actorController.add.bind(actorController)
    );
    application.put(
      "/actors/:id",
      AuthMiddleware.verifyAuthToken,
      actorController.update.bind(actorController)
    );
  }
}
