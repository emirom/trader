import { getClientTypesToday, IClientType } from "../api/getClientTypesToday";
import Symbol, { ISymbol } from "../models/Symbol";
/**
 * filter carrier functions are in sync and async form,
 * use as needed
 */

// ====== async : the symbolFilter argument is a async function
type AsyncFilter = (
  symbol: ISymbol,
  clientType?: IClientType
) => Promise<boolean>;
type AsyncBaseFilter = (symbolFilter: AsyncFilter) => Promise<ISymbol[]>;

export const asyncBaseFilter: AsyncBaseFilter = async (symbolFilter) => {
  try {
    const symbols: ISymbol[] = await Symbol.find({});
    const clientTypes: IClientType[] = await getClientTypesToday();
    return await Promise.all(
      symbols.filter(
        async (symbol) =>
          await symbolFilter(symbol, clientTypes && clientTypes[symbol.inscode])
      )
    );
  } catch (error) {
    throw new Error("filter base error: " + error);
  }
};

// ====== sync : the symbolFilter argument is a sync function

type Filter = (symbol: ISymbol, clientType: IClientType) => boolean;
type BaseFilter = (symbolFilter: Filter) => Promise<ISymbol[]>;

export const baseFilter: BaseFilter = async (symbolFilter) => {
  try {
    const symbols: ISymbol[] = await Symbol.find({});
    const clientTypes: IClientType[] = await getClientTypesToday();

    return symbols.filter((symbol) =>
      symbolFilter(
        symbol,
        clientTypes.find((ct) => ct.inscode === symbol.inscode)
      )
    );
  } catch (error) {
    throw new Error("filter base error: " + error);
  }
};

// type PutFilters = (symbolFilter: Filter[]) => Promise<ISymbol[]>;

// export const putFilters: BaseFilter = async (symbolFilter) => {
//   try {
//     const symbols: ISymbol[] = await Symbol.find({});
//     const clientTypes: IClientType[] = await getClientTypesToday();

//     return symbols.filter((symbol) =>
//       symbolFilter(
//         symbol,
//         clientTypes.find((ct) => ct.inscode === symbol.inscode)
//       )
//     );
//   } catch (error) {
//     throw new Error("filter base error: " + error);
//   }
// };
