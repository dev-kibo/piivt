import Ajv from "ajv";

interface IUpdateCinema {
  name: string;
}

const IUpdateCinemaValidator = new Ajv().compile({
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 64,
    },
  },
  required: ["name"],
  additionalProperties: false,
});

export { IUpdateCinema, IUpdateCinemaValidator };
