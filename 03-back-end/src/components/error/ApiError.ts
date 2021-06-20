export default class ApiError extends Error {
  private _code: string;
  private _description: string;

  constructor(code: string, description: string) {
    super(description);

    this._code = code;
    this._description = description;
  }

  public get code(): string {
    return this._code;
  }

  public get description(): string {
    return this._description;
  }
}
