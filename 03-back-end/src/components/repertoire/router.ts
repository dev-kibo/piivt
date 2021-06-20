import IRouter from "../../common/IRouter.interface";
import { Application } from "express";
import IApplicationResourcesInterface from "../../common/IApplicationResources.interface";
import RepertoireController from "./controller";

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
    application.post("/repertoires", repController.add.bind(repController));
  }
}
