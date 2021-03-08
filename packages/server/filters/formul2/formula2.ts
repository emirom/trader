// import { Request, Response } from "express";
// import {
//   getClientTypesToday,
//   IClientTypeVolCnt
// } from "../../api/getClientTypesToday";
// import Symbol, { ISymbol } from "../../models/Symbol";
// import { buySellRate, getBuyWeightBuySell } from "../buySellRate";
// import { hemayat } from "./hemayat";

// export const formula2 = async (_req: Request, res: Response) => {
//   try {
//     const clientTypes = await getClientTypesToday();
//     const symbols: ISymbol[] = await Symbol.find({}).lean();
//     const filtered: ISymbol[] = await filterSymbols(symbols, clientTypes);
//     const indicated =
//     const list = filtered.map((symbol) => symbol.l18);
//     res.status(200).send(list);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// const filterSymbols = (symbols: ISymbol[], cts: IClientTypeVolCnt[]) => {
//   return symbols.filter((symbol) => {

//     return hemayat(symbol) ;
//   });
// };
// const putIndicators = (symbols: ISymbol[], cts: IClientTypeVolCnt[])=>{
//   const ct = cts.find((ct) => ct.inscode === symbols.inscode);
//   buySellRate(symbol, ct, getBuyWeightBuySell)
// }
