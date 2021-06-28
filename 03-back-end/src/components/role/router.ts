import IRouter from "../../common/IRouter.interface";
import { Application } from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import RoleController from "./controler";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class RoleRouter implements IRouter {
  setupRoutes(application: Application, resources: IApplicationResources) {
    const roleController: RoleController = new RoleController(resources);

    application.post(
      "/roles",
      AuthMiddleware.verifyAuthToken,
      roleController.add.bind(roleController)
    );
    application.put(
      "/roles/:id",
      AuthMiddleware.verifyAuthToken,
      roleController.update.bind(roleController)
    );
    application.delete(
      "/roles/:id",
      AuthMiddleware.verifyAuthToken,
      roleController.delete.bind(roleController)
    );
  }
}
