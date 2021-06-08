import IModel from "../../common/IModel.interface";
import ProjectionModel from "../projection/model";

export default class RepertoireModel implements IModel {
  repertoireId: number;
  date: string;
  projections?: ProjectionModel[];
}
