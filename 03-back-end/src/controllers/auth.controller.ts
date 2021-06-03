import * as express from "express";
export default class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async signUp(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {}
}
