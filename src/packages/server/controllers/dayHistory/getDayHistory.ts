import { Request, Response } from "express";
import DayHistory from "../../models/DayHistory";

export const getDayHistory = async (req: Request, res: Response) => {
  try {
    const history = await DayHistory.findOne({ inscode: +req.params.inscode });
    console.log(history);

    res.status(200).send(history);
  } catch (error) {
    res.status(500).send(error);
  }
};
