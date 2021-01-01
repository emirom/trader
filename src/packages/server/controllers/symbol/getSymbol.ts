import Symbol from "../../models/Symbol";

export const getSymbol = async (inscode: string) =>
  await Symbol.findOne({ inscode });
