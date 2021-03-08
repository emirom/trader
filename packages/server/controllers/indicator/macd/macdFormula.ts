export const macdFormula = (ih): number => {
  try {
    if (!ih || ih?.length <= 0) return 0;
    const speriod = 12;
    const lperiod = 26;
    const sgperiod = 9;
    // -------------------------------------------------
    const dlen = ih.length > 60 ? 60 : ih.length;
    let xb = 0;
    let yb = 0;
    let dle = 0;
    let sma = 0;
    let sum = 0;
    let zr1 = 0;
    let zr2 = 0;
    let zr3 = 0;
    const zper = sgperiod + lperiod;
    //-----------------------------------------------------
    for (xb = 0; xb < dlen; xb++) {
      if (ih[xb]?.QTotTran5J > 0) {
        yb++;
      } else {
      }
    }
    dle = yb;
    let ema1 = [];
    ema1.length = dle;
    let ema2 = [];
    ema2.length = dle;
    let macd = [];
    macd.length = dle;
    let macsig = [];
    macsig.length = dle;
    let machis = [];
    machis.length = dle;
    let closdbs = [];
    closdbs.length = dle;
    //-----------------------------------------------------
    yb = dle + 1;
    for (xb = 0; xb < dlen; xb++) {
      if (ih[xb]?.QTotTran5J > 0) {
        yb--;
        closdbs[yb] = ih[xb]?.PDrCotVal;
      } else {
      }
    }
    zr1 = 2 / (speriod + 1);
    zr2 = 2 / (lperiod + 1);
    zr3 = 2 / (sgperiod + 1);
    sum = 0;
    for (xb = 1; xb <= speriod; xb++) {
      sum += closdbs[xb];
    }
    //sma1[speriod]=sum/speriod
    sma = sum / speriod;
    //ema1[speriod]=sma1[speriod]
    ema1[speriod] = sma;
    for (xb = speriod + 1; xb <= dle; xb++) {
      ema1[xb] = zr1 * (closdbs[xb] - ema1[xb - 1]) + ema1[xb - 1];
    }
    sum = 0;
    for (xb = 1; xb <= lperiod; xb++) {
      sum += closdbs[xb];
    }
    //sma2[lperiod]=sum/lperiod
    //ema2[lperiod]=sma2[lperiod]
    sma = sum / lperiod;
    ema2[lperiod] = sma;
    for (xb = lperiod + 1; xb <= dle; xb++) {
      ema2[xb] = zr2 * (closdbs[xb] - ema2[xb - 1]) + ema2[xb - 1];
    }
    for (xb = lperiod; xb <= dle; xb++) {
      macd[xb] = ema1[xb] - ema2[xb];
    }
    for (xb = lperiod; xb <= zper - 1; xb++) sum = 0;
    {
      sum += macd[xb];
    }
    sma = sum / sgperiod;
    macsig[zper - 1] = sma;
    for (xb = zper; xb <= dle; xb++) {
      macsig[xb] = zr3 * (macd[xb] - macsig[xb - 1]) + macsig[xb - 1];
      machis[xb] = macd[xb] - macsig[xb];
    }

    //******* */ modified to return buy and sell signals with values
    let buySignal; // return number to be in other indicator formats and usage
    dle >= zper && machis[dle - 1] > 0 && machis[dle] <= 0 // TODO : what if >=
      ? (buySignal = 1)
      : dle >= zper && machis[dle - 1] < 0 && machis[dle] <= 0
      ? (buySignal = -1)
      : (buySignal = 0);

    return buySignal;
    // {
    // macd: macd[dle],
    // macdsig: macsig[dle],
    // machis: machis[dle],
    //   buySignal,
    // };
  } catch (error) {
    throw new Error("macd err: " + error);
  }
};

export const getBuyWeightMacd = (buySignal: number): number =>
  buySignal === 1 ? 10 : 0;

export const getSellWeightMacd = (buySignal: number): number =>
  buySignal === -1 ? 11 : 0;
