import IUpdateProjection from "../../projection/dto/IUpdateProjection";

export default interface IUpdateRepertoire {
  startsAt: string;
  projections: IUpdateProjection[];
}
