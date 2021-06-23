import Ajv from "ajv";

interface IUpdateRole {
  role: string;
}

const IUpdateRoleValidator = new Ajv().compile({
  type: "object",
  properties: {
    role: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["role"],
  additionalProperties: false,
});

export { IUpdateRole, IUpdateRoleValidator };
