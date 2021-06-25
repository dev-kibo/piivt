import Ajv from "ajv";

const IDeleteRoleValidator = new Ajv().compile({
  type: "array",
  items: {
    type: "object",
    properties: {
      roleId: {
        type: "integer",
        minimum: 1,
      },
    },
    required: ["roleId"],
    additionalProperties: false,
  },
});

export default IDeleteRoleValidator;
