import { Application } from "express";
import IRouter from "../../common/IRouter.interface";
import IApplicationResources from "../../common/IApplicationResources.interface";
import ActorController from "./controller";

export default class ActorRouter implements IRouter {
  setupRoutes(application: Application, resources: IApplicationResources) {
    const actorController: ActorController = new ActorController(resources);

    application.get("/actors", actorController.getAll.bind(actorController));
    application.get(
      "/actors/:id",
      actorController.getById.bind(actorController)
    );
    application.post("/actors", actorController.add.bind(actorController));
    application.put(
      "/actors/:id",
      actorController.update.bind(actorController)
    );
  }
}
