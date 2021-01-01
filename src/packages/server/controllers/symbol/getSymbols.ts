import Symbol from "../../models/Symbol";

export const getSymbols = async () => await Symbol.find();
