import IRouter from "../../common/IRouter.interface";
import { Application } from "express";
import IApplicationResourcesInterface from "../../common/IApplicationResources.interface";
import AdminController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class AdminRouter implements IRouter {
  setupRoutes(
    application: Application,
    resources: IApplicationResourcesInterface
  ) {
    const adminController: AdminController = new AdminController(resources);

    application.get(
      "/admins/me",
      AuthMiddleware.verifyAuthToken,
      adminController.getCurrent.bind(adminController)
    );
    application.get(
      "/admins/:id",
      AuthMiddleware.verifyAuthToken,
      adminController.getById.bind(adminController)
    );
    application.post(
      "/admins",
      AuthMiddleware.verifyAuthToken,
      adminController.add.bind(adminController)
    );
  }
}
