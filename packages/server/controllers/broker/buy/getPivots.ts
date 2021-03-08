import { getTodayOrders, SymbolOrder } from "../../../api/getTodayOrders";

type Pivots = {
  resistances: number[];
  maxRes: number | undefined;
  supports: number[];
  minSupp: number | undefined;
};

export const getPivots = async (inscode: string) => {
  const orders: SymbolOrder[] = await getTodayOrders(inscode);
  let prevSlope;
  const response: Pivots = {
    resistances: [],
    maxRes: undefined,
    supports: [],
    minSupp: undefined,
  };
  if (orders.length < 2) return response;
  else prevSlope = getSlope(orders, 0);

  for (let i = 1; orders.length > i + 1; i++) {
    const currentSlope = getSlope(orders, i);

    checkSupport(currentSlope, prevSlope, response, orders, i) ||
      checkResistance(currentSlope, prevSlope, response, orders, i);

    prevSlope = currentSlope;
  }
  return response;
};

const getSlope = (orders: SymbolOrder[], i: number) => {
  return (
    (orders[i + 1].price - orders[i].price) /
    (+orders[i + 1].time - +orders[i].time)
  );
};

const checkSupport = (
  currentSlope: number,
  prevSlope: number,
  response: Pivots,
  orders: SymbolOrder[],
  i: number
) => {
  const isSupport = currentSlope > 0 && prevSlope < 0;
  isSupport && response.supports.push(orders[i].price);

  isSupport &&
    (orders[i].price < response.minSupp || !response.minSupp) &&
    (response.minSupp = orders[i].price);
  return isSupport;
};

const checkResistance = (
  currentSlope: number,
  prevSlope: number,
  response: Pivots,
  orders: SymbolOrder[],
  i: number
) => {
  const isResistance = prevSlope > 0 && currentSlope < 0;
  isResistance && response.supports.push(orders[i].price);

  isResistance &&
    (orders[i].price > response.maxRes || !response.maxRes) &&
    (response.maxRes = orders[i].price);

  return isResistance;
};
