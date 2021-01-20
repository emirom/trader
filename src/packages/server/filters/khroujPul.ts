import { watchCustomerType } from "../api/watchSymbol";
import { asyncBaseFilter } from "./baseFilter";

export const khroujPul = async (symbols) =>
  await asyncBaseFilter(symbols, khoroujPulFilter);

const khoroujPulFilter = async (symbol) => {
  const ct = await watchCustomerType(symbol.inscode);

  return (
    symbol.tvol > symbol.avg30_QTotTran5J &&
    ct.Buy_I_Volume / ct.Buy_CountI < ct.Sell_I_Volume / ct.Sell_CountI &&
    symbol.pl <= symbol.pc &&
    symbol.plp < 0
  );
};
