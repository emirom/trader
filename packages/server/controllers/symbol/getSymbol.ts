import { Request, Response } from "express";
import ISymbol from "../../models/Symbol";

export const getSymbol = async (req: Request, res: Response) => {
  try {
    const { fieldName, value } = req.query;
    console.log("request received!", JSON.parse(value.toString()), value);

    if (typeof fieldName !== "string") {
      throw new Error("The " + fieldName + " parameter must be string.");
    }
    const symbol = await ISymbol.findOne({ [fieldName]: value });

    res.status(200).send(symbol);
  } catch (error) {
    res.status(500).send(error);
  }
};
