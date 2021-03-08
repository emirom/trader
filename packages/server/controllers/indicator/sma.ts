const smaFormula = (symbol, ih) => {
  var PriceN = function () {
    var price = ih[0].PClosing;
    var D = 10;
    var N = D - 1;
    var n;

    for (n = 1; n <= N; n++) price = ih[n].PClosing + price;
    if ((n = N)) {
      price = price / (n + 1);
    }
    return price;
  };
  if (symbol.pl < PriceN()) {
    return true;
  } else {
    return false;
  }
};
