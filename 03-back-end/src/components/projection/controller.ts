import { Request, Response, NextFunction } from "express";
import BaseController from "../../common/BaseController";

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
      res.send(
        await this.services.projectionService.getAllProjectionsForMovie(id)
      );
    } catch (error) {
      next(error);
    }
  }
}
