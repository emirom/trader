import { Request, Response } from "express";
import ISymbol from "../../models/Symbol";

export const deleteSymbols = async (_req: Request, res: Response) => {
  try {
    const total = await ISymbol.deleteMany();
    res.status(200).send(total);
  } catch (error) {
    res.status(500).send("Delete symbols error:" + error);
  }
};
