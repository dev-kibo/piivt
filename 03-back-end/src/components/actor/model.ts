import IModel from "../../common/IModel.interface";

export default class ActorModel implements IModel {
  actorId: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
}
