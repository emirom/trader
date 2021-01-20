import Ih from "../../models/DayHistory";

export const getIntraHistory = async (inscode: number) =>
  await Ih.findOne({ inscode });
