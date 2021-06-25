import Ajv from "ajv";

const IAddOrUpdateRoleValidator = new Ajv().compile({
  type: "array",
  items: {
    type: "object",
    properties: {
      roleId: {
        type: "string",
        minLength: 1,
      },
      role: {
        type: "string",
        minLength: 1,
      },
      actorId: {
        type: "integer",
        minimum: 1,
      },
      movieId: {
        type: "integer",
        minimum: 1,
      },
    },
    additionalProperties: false,
  },
});

export default IAddOrUpdateRoleValidator;
