import IRouter from "../../common/IRouter.interface";
import { Application } from "express";
import IApplicationResourcesInterface from "../../common/IApplicationResources.interface";
import ProjectionController from "./controller";

export default class ProjectionRouter implements IRouter {
  setupRoutes(
    application: Application,
    resources: IApplicationResourcesInterface
  ) {
    const controller: ProjectionController = new ProjectionController(
      resources
    );

    application.get(
      "/projections/movies/:id",
      controller.getAllProjectionsForMovie.bind(controller)
    );
  }
}
