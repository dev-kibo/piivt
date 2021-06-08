import IRouter from "../../common/IRouter.interface";
import { Application } from "express";
import IApplicationResourcesInterface from "../../common/IApplicationResources.interface";
import AdminController from "./controller";

export default class AdminRouter implements IRouter {
  setupRoutes(
    application: Application,
    resources: IApplicationResourcesInterface
  ) {
    const adminController: AdminController = new AdminController(resources);

    application.get(
      "/admins/:id",
      adminController.getById.bind(adminController)
    );
    application.post("/admins", adminController.add.bind(adminController));
  }
}
