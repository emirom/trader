import { Request, Response } from "express";
import { getSymbolsLastDay } from "../../api/getSymbolsLastDay";
import ISymbol, {
  CalculatedSymbolProps,
  FetchedSymbolProps,
} from "../../models/Symbol";
import { roundTo2 } from "../../utils/roundTo";

export const initializeSymbols = async (_req: Request, res: Response) => {
  try {
    const data = await getSymbolsLastDay();
    const symbols: SymbolWithCalculatedProps[] = calcProperties(data);
    const result = await ISymbol.insertMany(symbols);
    res
      .status(200)
      .send(result.length + " symbols were created sucessfully ...");
  } catch (error) {
    res.status(500).send("\nError on symbols initialization:" + error);
  }
};

interface SymbolWithCalculatedProps
  extends CalculatedSymbolProps,
    FetchedSymbolProps {}

type CalcProperties = (
  symbols: FetchedSymbolProps[]
) => SymbolWithCalculatedProps[];

const calcProperties: CalcProperties = (symbols) => {
  return symbols.map((symbol) => calcSymbolProps(symbol));
};

type CalcSymbolProps = (data: FetchedSymbolProps) => SymbolWithCalculatedProps;

const calcSymbolProps: CalcSymbolProps = (data: FetchedSymbolProps) => {
  const pcc = data.pc - data.py;
  const pcp = roundTo2((100 * pcc) / data.py);
  const plc = data.tno === 0 ? 0 : data.pl - data.py;
  const plp = data.tno === 0 ? 0 : (100 * plc) / data.py;
  const pe = data.eps ? roundTo2((100 * data.pc) / data.eps) : 0;
  return {
    ...data,
    pcc, // تغییر قیمت پایانی price closing change
    pcp, // درصد تغییر قیمت پایانی price change percent
    plc, // تغییر آخرین قیمت price last change
    plp, //درصد تغییر آخرین قیمت  price last percent
    pe, // انتظارات سرمایه گذاران از بازدهی آینده p/e ,
  } as SymbolWithCalculatedProps;
};
