import BaseController from "../../common/BaseController";
import { NextFunction, Request, Response } from "express";
import { IAddRole, IAddRoleValidator } from "./dto/IAddRole";

export default class RoleController extends BaseController {
  async add(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (!IAddRoleValidator(data)) {
      return res.status(400).send(IAddRoleValidator.errors);
    }

    try {
      res.send(await this.services.roleService.add(data as IAddRole));
    } catch (error) {
      next(error);
    }
  }
}
