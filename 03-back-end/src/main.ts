import * as express from "express";
import Config from "./config/dev";
import * as cors from "cors";
import * as fs from "fs";
import * as path from "path";
import * as morgan from "morgan";
import IApplicationResources from "./common/IApplicationResources.interface";
import * as mysql2 from "mysql2/promise";
import Router from "./router";
import CinemaRouter from "./components/cinema/router";
import CinemaService from "./components/cinema/service";
import ActorService from "./components/actor/service";
import ActorRouter from "./components/actor/router";
import MovieService from "./components/movie/service";
import MovieRouter from "./components/movie/router";
import fileUpload = require("express-fileupload");
import RoleService from "./components/role/service";
import RoleRouter from "./components/role/router";
import ProjectionService from "./components/projection/service";
import RepertoireService from "./components/repertoire/service";
import RepertoireRouter from "./components/repertoire/router";
import AdminService from "./components/admin/service";
import AdminRouter from "./components/admin/router";

async function main() {
  const application: express.Application = express();

  fs.mkdirSync(path.dirname(Config.logger.path), {
    mode: 0o755,
    recursive: true,
  });

  application.use(
    morgan(
      ":date[iso]\t:remote-addr\t:method\t:status\t:res[content-length] bytes\t:response-time ms",
      {
        stream: fs.createWriteStream(Config.logger.path),
      }
    )
  );

  application.use(cors());
  application.use(express.json());
  application.use(
    fileUpload({
      limits: {
        fileSize: Config.fileUpload.maxSize,
        files: 1,
      },
      useTempFiles: true,
      tempFileDir: Config.fileUpload.tempDir,
      safeFileNames: true,
      createParentPath: true,
      abortOnLimit: true,
    })
  );

  const resources: IApplicationResources = {
    databaseConnection: await mysql2.createConnection({
      host: Config.database.host,
      port: Config.database.port,
      user: Config.database.user,
      password: Config.database.password,
      database: Config.database.database,
      charset: Config.database.charset,
      timezone: Config.database.timezone,
      supportBigNumbers: true,
      dateStrings: ["DATE", "DATETIME"],
    }),
  };

  resources.databaseConnection.connect();

  resources.services = {
    cinemaService: new CinemaService(resources),
    actorService: new ActorService(resources),
    movieService: new MovieService(resources),
    roleService: new RoleService(resources),
    projectionService: new ProjectionService(resources),
    repertoireService: new RepertoireService(resources),
    adminService: new AdminService(resources),
  };

  application.use(
    Config.server.static.route,
    express.static(Config.server.static.path, {
      cacheControl: Config.server.static.cacheControl,
      dotfiles: Config.server.static.dotFiles,
      etag: Config.server.static.etag,
      maxAge: Config.server.static.maxAge,
      index: Config.server.static.index,
    })
  );

  Router.setupRoutes(application, resources, [
    new CinemaRouter(),
    new ActorRouter(),
    new MovieRouter(),
    new RoleRouter(),
    new RepertoireRouter(),
    new AdminRouter(),
  ]);

  application.use((err, req, res, next) => {
    console.dir(err);
    res.status(500).send(err);
  });

  application.listen(Config.server.port);
}

main();
