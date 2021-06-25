import { Request, Response, NextFunction } from "express";
import BaseController from "../../common/BaseController";
import IAddCinemaValidator from "./dto/IAddCinemaValidator";
import IAddCinema from "./dto/IAddCinema";
import { IUpdateCinema, IUpdateCinemaValidator } from "./dto/IUpdateCinema";
import CinemaModel from "./model";

export default class CinemaController extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await this.services.cinemaService.getAll());
    } catch (error) {
      next(error);
    }
  }

  async getAllBySearchTerm(req: Request, res: Response, next: NextFunction) {
    const searchTerm = "" + req.params["search"] ?? "";

    try {
      res.send(
        await this.services.cinemaService.getAllBySearchTerm(searchTerm)
      );
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id;

    if (id <= 0) {
      return res.status(400).send("Invalid ID number");
    }

    try {
      const cinema: CinemaModel | null =
        await this.services.cinemaService.getById(id);

      if (cinema === null) {
        return res.sendStatus(404);
      }

      res.send(cinema);
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (!IAddCinemaValidator(data)) {
      return res.status(400).send(IAddCinemaValidator.errors);
    }

    try {
      res.send(await this.services.cinemaService.add(data as IAddCinema));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id;

    if (id <= 0) {
      return res.status(400).send("Invalid ID number.");
    }

    const data = req.body;

    if (!IUpdateCinemaValidator(data)) {
      return res.status(400).send(IUpdateCinemaValidator.errors);
    }

    try {
      const result: CinemaModel | null =
        await this.services.cinemaService.update(data as IUpdateCinema, id);

      if (result === null) {
        return res.sendStatus(404);
      }

      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = +req.params?.id;

    if (id <= 0) {
      return res.status(400).send("Invalid ID number.");
    }

    try {
      const result: boolean | null = await this.services.cinemaService.delete(
        id
      );

      if (result === null) {
        return res.sendStatus(404);
      }

      if (result) {
        return res.sendStatus(204);
      }
    } catch (error) {
      next(error);
    }
  }
}
