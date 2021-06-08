import IModel from "../../common/IModel.interface";

export default class AdminModel implements IModel {
  adminId: number;
  email: string;
  passwordHash: string;
  refreshToken: string;
  createdAt: string;
}
