import { IClientTypeVolCnt } from "../../../api/getClientTypesToday";
import { getTodayOrders, SymbolOrder } from "../../../api/getTodayOrders";
import { watchClientType } from "../../../api/watchSymbol";
import { ISymbol } from "../../../models/Symbol";
import Trade, { ITrade, TradeSymbol } from "../../../models/Trade";
import { calcIndicators } from "../buy/calcIndicators";

type Cache = {
  acceleration: number;
  velocityLast: number;
  velocityPrev: number;
};

export const sellLogic = async (symbol: ISymbol, bought: ITrade) => {
  const clientType: IClientTypeVolCnt = await watchClientType(symbol.inscode);
  const tradeSymbol: TradeSymbol = await calcIndicators(
    [symbol],
    [clientType],
    false
  )[0];

  let orders: SymbolOrder[] = await getTodayOrders(symbol.inscode);
  const cache: Cache = {
    acceleration: getAcceleration(orders),
    velocityLast: getVelocity(orders, 0),
    velocityPrev: 0,
  };

  let sold = false;
  do {
    const pl = +orders[orders.length - 1].price;
    if (
      isScoreOfSell(tradeSymbol) ||
      isNearResistance(tradeSymbol) ||
      isPriceAccelerationDecreased(orders, cache)
    ) {
      await sell(tradeSymbol, bought);
      sold = true;
    } else if (hasBetterSymbol(cache, pl)) {
      sell(tradeSymbol, bought);
      sold = true;
    }
    sold = true;
  } while (!sold);
};

export const sell = async (tradeSymbol: TradeSymbol, bought: ITrade) => {
  const date = new Date();
  const symbol = tradeSymbol.symbol;
  const trade: ITrade = await Trade.create({
    date,
    inscode: bought.inscode,
    isBuy: false,
    price: symbol.pl,
    amount: bought.amount,
    ...tradeSymbol,
  });
  console.log("sold : ");
  console.table(trade);
};

const isScoreOfSell = (symbol: TradeSymbol) => symbol.score > 60;

const isNearResistance = (tradeSymbol: TradeSymbol) =>
  tradeSymbol.symbol.pl >= 0.95 * tradeSymbol.symbol.pmax;

const isPriceAccelerationDecreased = async (
  orders: SymbolOrder[],
  cache: Cache
) => {
  const prevAcc = cache.acceleration;
  const current = getAcceleration(orders);
  cache.acceleration = current;
  return current < prevAcc;
};

const getAcceleration = (orders: SymbolOrder[]) => {
  const velocityLast = getVelocity(orders, 0);
  const velocityPrev = getVelocity(orders, 1);
  return (velocityLast - velocityPrev) / getAccTime(orders);
};

// const getSymbolPl = async (inscode: string) => (await watchSymbol(inscode)).pl;
const getVelocity = (orders: SymbolOrder[], index: number) => {
  const pair = index * 2;
  const lastOrder = orders[orders.length - 1 - pair];
  const prevOrder = orders[orders.length - 2 - pair];
  const diffPrice = +lastOrder.price - +prevOrder.price;
  const diffTime = +lastOrder.time - +prevOrder.time;
  return diffPrice / diffTime;
};

const hasBetterSymbol = (cache: Cache, pl: number) => {
  // const timeToResistance = cache.
  return true;
  // return
};

const getAccTime = (orders: SymbolOrder[]) => {
  const len = orders.length;
  const time1 = +orders[len - 1].time;
  const time2 = +orders[len - 4].time;
  return new Date(time1).valueOf() - new Date(time2).valueOf();
};
