import IRouter from "../../common/IRouter.interface";
import { Application } from "express";
import IApplicationResourcesInterface from "../../common/IApplicationResources.interface";
import AuthController from "./controller";

export default class AuthRouter implements IRouter {
  setupRoutes(
    application: Application,
    resources: IApplicationResourcesInterface
  ) {
    const authController: AuthController = new AuthController(resources);

    application.post(
      "/auth/sign-in",
      authController.signIn.bind(authController)
    );
  }
}
