import Ih from "../../models/dayHistory";

export const getIntraHistory = async (inscode: number) =>
  await Ih.findOne({ inscode });
