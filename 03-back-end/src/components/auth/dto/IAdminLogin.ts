import Ajv from "ajv";

interface IAdminLogin {
  email: string;
  password: string;
}

const IAdminLoginValidator = new Ajv().compile({
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

export { IAdminLogin, IAdminLoginValidator };
