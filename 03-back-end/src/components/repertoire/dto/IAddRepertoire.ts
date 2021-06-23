import IAddProjection from "../../projection/dto/IAddProjection";

export default interface IAddRepertoire {
  startsAt: string;
  projections: IAddProjection[];
}
