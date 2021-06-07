import IRouter from "../../common/IRouter.interface";
import { Application } from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import RoleController from "./controler";

export default class RoleRouter implements IRouter {
  setupRoutes(application: Application, resources: IApplicationResources) {
    const roleController: RoleController = new RoleController(resources);

    application.post("/roles", roleController.add.bind(roleController));
  }
}
