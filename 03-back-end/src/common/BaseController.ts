import IApplicationResources from "./IApplicationResources.interface";
import IServices from "./IServices.interface";
export default abstract class BaseController {
  private resources: IApplicationResources;

  constructor(resources: IApplicationResources) {
    this.resources = resources;
  }

  protected get services(): IServices {
    return this.resources.services;
  }

  protected get db() {
    return this.resources.databaseConnection;
  }
}
