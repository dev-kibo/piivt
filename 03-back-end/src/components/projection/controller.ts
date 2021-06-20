import { Request, Response, NextFunction } from "express";
import BaseController from "../../common/BaseController";
import ProjectionModel from "./model";

export default class ProjectionController extends BaseController {
  async getAllProjectionsForMovie(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id: number = +req.params.id;

    if (id <= 0) {
      return res.status(400).send("Invalid ID number");
    }

    try {
      const result: ProjectionModel[] | null =
        await this.services.projectionService.getAllProjectionsForMovie(id);

      if (!result) {
        return res.sendStatus(404);
      }

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}
