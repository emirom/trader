import { Request, Response } from "express";
import DayHistory, { IHistory } from "../../models/DayHistory";

export const getDayHistory = async (req: Request, res: Response) => {
  try {
    const history: IHistory = await DayHistory.findOne({
      inscode: req.params.inscode,
    });

    res.status(200).send(history);
  } catch (error) {
    res.status(500).send(error);
  }
};
