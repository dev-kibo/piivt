import BaseController from "../../common/BaseController";
import { NextFunction, Request, Response } from "express";
import MovieModel from "./model";
import { IAddMovie, IAddMovieValidator } from "./dto/IAddMovie";

export default class MovieController extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await this.services.movieService.getAll());
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
      const movie: MovieModel | null = await this.services.movieService.getById(
        id
      );

      if (movie === null) {
        return res.sendStatus(404);
      }

      res.send(movie);
    } catch (error) {
      next(error);
    }
  }

  async getAllMoviesWithRoles(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id;

    if (id <= 0) {
      return res.status(400).send("Invalid ID number");
    }

    try {
      const movie: MovieModel | null = await this.services.movieService.getById(
        id,
        { loadRoles: true }
      );

      if (movie === null) {
        return res.sendStatus(404);
      }

      res.send(movie);
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("You must upload image poster.");
    }

    const data = req.body;

    if (!IAddMovieValidator(data)) {
      return res.status(400).send(IAddMovieValidator.errors);
    }

    try {
      res.send(
        await this.services.movieService.add(
          data as IAddMovie,
          req.files["poster"]
        )
      );
    } catch (error) {
      next(error);
    }
  }
}
