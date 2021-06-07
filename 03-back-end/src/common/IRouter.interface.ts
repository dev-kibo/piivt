import { Application } from "express";
import IApplicationResources from "./IApplicationResources.interface";

export default interface IRouter {
  setupRoutes(application: Application, resources: IApplicationResources);
}
