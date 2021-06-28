import { NextFunction, Request, Response } from "express";
import BaseController from "../../common/BaseController";
import { IAddAdmin, IAddAdminValidator } from "./dto/IAddAdmin";
import AdminModel from "./model";
import * as jwt from "jsonwebtoken";
import IToken from "./dto/IToken";

export default class AdminController extends BaseController {
  async getById(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;

    if (id <= 0) {
      res.status(400).send("Invalid ID number.");
    }

    try {
      const admin: AdminModel | null = await this.services.adminService.getById(
        id
      );

      if (admin === null) {
        return res.sendStatus(404);
      }

      res.send(admin);
    } catch (error) {
      next(error);
    }
  }

  async getCurrent(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers["authorization"]?.split(" ")[1];

    if (!accessToken) {
      return res.sendStatus(400);
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        process.env?.SECRET_KEY as string
      );

      try {
        const admin = await this.services.adminService.getByEmail(
          (decoded as IToken).email
        );

        return res.send(admin);
      } catch (error) {
        return res.sendStatus(404);
      }
    } catch (error) {
      return res.sendStatus(401);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (!IAddAdminValidator(data)) {
      res.status(400).send(IAddAdminValidator.errors);
    }

    try {
      res.send(await this.services.adminService.add(data as IAddAdmin));
    } catch (error) {
      next(error);
    }
  }
}
