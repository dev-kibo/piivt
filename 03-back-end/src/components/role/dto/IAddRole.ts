import Ajv from "ajv";

interface IAddRole {
  actorId: number;
  movieId: number;
  role: string;
}

const IAddRoleValidator = new Ajv().compile({
  type: "object",
  properties: {
    actorId: {
      type: "integer",
      minimum: 1,
    },
    movieId: {
      type: "integer",
      minimum: 1,
    },
    role: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
  },
  required: ["movieId", "actorId", "role"],
  additionalProperties: false,
});

export { IAddRole, IAddRoleValidator };
