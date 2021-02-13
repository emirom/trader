//SMA
var CalculateSMA = function (ih, period) {
  var len = period;
  var sum = 0;
  for (let j = 10; j < len + 10; j++) {
    sum = ih[j].PDrCotVal + sum;
  }
  var average = sum / period;
  return average;
};

//pre9MA
//pre9MA

var pre9CalculateEMA = function (ih, period) {
  var pre9EMA =
    (ih[9].PDrCotVal - CalculateSMA(ih, period)) * (2 / (period + 1)) +
    CalculateSMA(ih, period);

  return pre9EMA;
};
//preEMA
//preEMA

var pre8CalculateEMA = function (ih, period) {
  var pre8EMA =
    (ih[1].PDrCotVal - pre9CalculateEMA(ih, period)) * (2 / (period + 1)) +
    pre9CalculateEMA(ih, period);

  return pre8EMA;
};
//preEMA
//preEMA

var pre7CalculateEMA = function (ih, period) {
  var pre7EMA =
    (ih[1].PDrCotVal - pre8CalculateEMA(ih, period)) * (2 / (period + 1)) +
    pre8CalculateEMA(ih, period);

  return pre7EMA;
};
//preEMA
//preEMA

var pre6CalculateEMA = function (ih, period) {
  var pre6EMA =
    (ih[1].PDrCotVal - pre7CalculateEMA(ih, period)) * (2 / (period + 1)) +
    pre7CalculateEMA(ih, period);

  return pre6EMA;
};
//preEMA
//preEMA

var pre5CalculateEMA = function (ih, period) {
  var pre5EMA =
    (ih[1].PDrCotVal - pre6CalculateEMA(ih, period)) * (2 / (period + 1)) +
    pre6CalculateEMA(ih, period);

  return pre5EMA;
};
//preEMA
//preEMA

var pre4CalculateEMA = function (ih, period) {
  var pre4EMA =
    (ih[1].PDrCotVal - pre5CalculateEMA(ih, period)) * (2 / (period + 1)) +
    pre5CalculateEMA(ih, period);

  return pre4EMA;
};
//preEMA
//preEMA

var pre3CalculateEMA = function (ih, period) {
  var pre3EMA =
    (ih[1].PDrCotVal - pre4CalculateEMA(ih, period)) * (2 / (period + 1)) +
    pre4CalculateEMA(ih, period);

  return pre3EMA;
};
//preEMA
//preEMA

var pre2CalculateEMA = function (ih, period) {
  var pre2EMA =
    (ih[1].PDrCotVal - pre3CalculateEMA(ih, period)) * (2 / (period + 1)) +
    pre3CalculateEMA(ih, period);

  return pre2EMA;
};
//preEMA
//preEMA

var pre1CalculateEMA = function (ih, period) {
  var pre1EMA =
    (ih[1].PDrCotVal - pre2CalculateEMA(ih, period)) * (2 / (period + 1)) +
    pre2CalculateEMA(ih, period);

  return pre1EMA;
};

//EMA
//EMA

var CalculateEMA = function (ih, period) {
  var EMA =
    (ih[0].PDrCotVal - pre1CalculateEMA(ih, period)) * (2 / (period + 1)) +
    pre1CalculateEMA(ih, period);

  return EMA;
};

const Macd = (ih) => CalculateEMA(ih, 12) - CalculateEMA(ih, 26);

// (cfield0) =CalculateEMA (12) - CalculateEMA (26)

////////////////////////////////RSI
// var CalculateRSI = function (ih: RangeHistory[], period) {
//   var len = 20;

//   for (let i = 0; i < len; i++) {
//     const rec = ih[len - 1 - i];

//     const change = rec.PClosing - rec.PriceYesterday;

//     if (change > 0) {
//       rec.gain = change;
//       rec.loss = 0;
//     } else {
//       rec.gain = 0;
//       rec.loss = -change;
//     }
//   }

//   // Calculate first "average gain" and "average loss"
//   var gainSum = 0;
//   var lossSum = 0;

//   for (let i = 0; i < period; i++) {
//     var rec = ih[len - 1 - i];
//     gainSum += rec.gain;
//     lossSum += rec.loss;
//   }

//   let averageGain = gainSum / period;
//   let averageLoss = lossSum / period;

//   // Calculate subsequent "average gain" and "average loss" values
//   for (let i = period + 1; i < len; i++) {
//     const rec = ih[len - 1 - i];

//     averageGain = (averageGain * (period - 1) + rec.gain) / period;
//     averageLoss = (averageLoss * (period - 1) + rec.loss) / period;

//     rec.averageGain = averageGain;
//     rec.averageGain = averageGain;
//   }

//   // Calculate RSI
//   var RS = 0; // Relative strength
//   var RSIndex = 0; // Relative strength index

//   for (var i = period + 1; i < len; i++) {
//     var rec = ih[len - 1 - i];

//     RS = rec.gain / rec.loss;
//     RSIndex = 100 - 100 / (1 + RS);
//     rec.rsi = RSIndex;
//   }

//   if (typeof ih[0].rsi == "undefined") CalculateRSI(14);

//   // (cfield1)= ih[0].rsi;
//   // var Rsi=0;
//   // Rsi= ih[0].rsi;
// };
