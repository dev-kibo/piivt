import Ajv from "ajv";
import { IAddProjection } from "../../projection/dto/IAddProjection";

interface IAddRepertoire {
  startsAt: string;
  projections: IAddProjection[];
}

const IAddRepertoireValidator = new Ajv().compile({
  type: "object",
  properties: {
    startsAt: {
      type: "string",
    },
    projections: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          cinemaId: {
            type: "integer",
            minimum: 1,
          },
          movieId: {
            type: "integer",
            minimum: 1,
          },
        },
      },
    },
  },
  required: ["startsAt", "projections"],
  additionalProperties: false,
});

export { IAddRepertoire, IAddRepertoireValidator };
