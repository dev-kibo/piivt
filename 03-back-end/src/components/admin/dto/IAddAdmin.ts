import Ajv from "ajv";

interface IAddAdmin {
  email: string;
  password: string;
}

const IAddAdminValidator = new Ajv().compile({
  type: "object",
  properties: {
    email: {
      type: "string",
      minLength: 3,
    },
    password: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
});

export { IAddAdmin, IAddAdminValidator };
