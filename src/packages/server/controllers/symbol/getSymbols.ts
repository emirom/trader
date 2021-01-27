import { Request, Response } from "express";
import ISymbol from "../../models/Symbol";

export const getSymbols = async (_req: Request, res: Response) => {
  try {
    const symbols = await ISymbol.find();
    res.status(200).send(symbols);
  } catch (error) {
    res.status(500).send("Error on getting symbols:" + error);
  }
};
