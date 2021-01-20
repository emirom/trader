import ISymbol from "../../models/Symbol";

export const getSymbols = async () => await ISymbol.find();
