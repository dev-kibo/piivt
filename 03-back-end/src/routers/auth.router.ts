import * as express from "express";
import AuthController from "../controllers/auth.controller";
import IApplicationResources from "../services/IApplicationResources.inteface";

export default class AuthRouter {
  public static setupRoutes(
    application: express.Application,
    resources: IApplicationResources
  ) {
    const authService: AuthService = new AuthService();

    const authController: AuthController = new AuthController(authService);

    application.post(
      "/auth/sign-up",
      authController.signUp.bind(authController)
    );
  }
}
