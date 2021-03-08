export const getDate = () => {
  const date = new Date();
  const day = date.getDay();
  /**
   * check weekends :
   */
  return !(day % 4) // is thursday
    ? getPrevDays(date, 1)
    : !(day % 5) // is friday
    ? getPrevDays(date, 2) // wednesday date
    : !(day % 6) && // is saturday
      isBeforeMarketTime(date)
    ? getPrevDays(date, 3) // wednesday date
    : /**
     * check workdays:
     */
    isBeforeMarketTime
    ? getPrevDays(date, 1)
    : new Date();
};

const getPrevDays = (date: Date, days: number) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - days,
    date.getHours(),
    date.getMinutes()
  );

const isBeforeMarketTime = (date: Date) =>
  date.getHours() < 8 || (date.getHours() === 8 && date.getMinutes() < 45);
