import { Request, Response } from "express";
import {
  getClientTypesToday,
  IClientType,
} from "../../api/getClientTypesToday";

export const getAllClientTypes = async (_req: Request, res: Response) => {
  try {
    const result: IClientType[] = await getClientTypesToday();
    console.log(result);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
