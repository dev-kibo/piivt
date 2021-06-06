import BaseService from "../../common/BaseService";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import { IAddMovie } from "./dto/IAddMovie";
import MovieModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import Config from "../../config/dev";
import { v4 } from "uuid";
import * as path from "path";
import sharp = require("sharp");

class MovieModelAdapterOptions implements IModelAdapterOptionsInterface {}

export default class MovieService extends BaseService<MovieModel> {
  protected async adaptModel(
    data: any,
    options: Partial<IModelAdapterOptionsInterface>
  ): Promise<MovieModel> {
    const model = new MovieModel();

    model.movieId = +data?.movie_id;
    model.title = data?.title;
    model.description = data?.description;
    model.duration = +data?.duration;
    model.releasedAt = new Date(data?.released_at);
    model.posterUrl = `${Config.server.baseUrl}/${data.poster_path}`;

    return model;
  }

  public async getAll(
    options: Partial<MovieModelAdapterOptions> = {}
  ): Promise<MovieModel[]> {
    return await this.getAllFromTable("movie", options);
  }

  public async getById(
    id: number,
    options: Partial<MovieModelAdapterOptions> = {}
  ): Promise<MovieModel | null> {
    return await this.getByIdFromTable("movie", id, options);
  }

  private async uploadMoviePoster(file: any, movieId: number): Promise<string> {
    return new Promise<string>(async (resolve) => {
      const imagePath: string = `${
        Config.fileUpload.uploadDest
      }/movies/${movieId}/${v4()}.jpg`;

      await file.mv(imagePath);

      resolve(imagePath);
    });
  }

  private isPosterValid(posterFile: any): boolean {
    return (
      posterFile.mimetype === "image/jpeg" ||
      posterFile.mimetpye === "image/png"
    );
  }

  private async resizeUploadedPhoto(imagePath: string) {
    const pathParts = path.parse(imagePath);

    const directory = pathParts.dir;
    const filename = pathParts.name;
    const extension = pathParts.ext;

    for (const resizeSpecification of Config.fileUpload.photos.resizes) {
      const resizedImagePath =
        directory + "/" + filename + resizeSpecification.sufix + extension;
      await sharp(imagePath)
        .resize({
          width: resizeSpecification.width,
          height: resizeSpecification.height,
          fit: resizeSpecification.fit,
          background: { r: 255, g: 255, b: 255, alpha: 1.0 },
          withoutEnlargement: true,
        })
        .toFile(resizedImagePath);
    }
  }

  public async add(data: IAddMovie, posterFile: any): Promise<MovieModel> {
    return new Promise<MovieModel>(async (resolve, reject) => {
      try {
        if (!this.isPosterValid(posterFile)) {
          const error: IErrorResponse = {
            code: 9910,
            description: "Image must be in jpg or png format.",
          };

          return reject(error);
        }

        await this.db.beginTransaction();

        const insertQuery: string =
          "INSERT movie SET title = ?, description = ?, released_at = ?, duration = ?;";

        const result = await this.db.execute(insertQuery, [
          data.title,
          data.description,
          data.releasedAt,
          data.duration,
        ]);

        const insertInfo: any = result[0];
        const movieId = +insertInfo?.insertId;

        const posterPath = await this.uploadMoviePoster(posterFile, movieId);
        await this.resizeUploadedPhoto(posterPath);

        const updateQuery: string =
          "UPDATE movie SET poster_path = ? WHERE movie_id = ?;";

        await this.db.execute(updateQuery, [posterPath, movieId]);

        await this.db.commit();

        resolve(await this.getById(movieId));
      } catch (error) {
        await this.db.rollback();

        const e: IErrorResponse = {
          code: error?.errno,
          description: error?.message,
        };
        reject(e);
      }
    });
  }

  // to do UPDATE
}
