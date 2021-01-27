import { cciIndicator } from "../../filters/cci";
import ISymbol from "../../models/Symbol";

export const cciOnAll = async () =>
  // req: Request, res: Response
  {
    const symbols = await ISymbol.find({}, function (err) {
      if (err) {
        console.log(err);
      } else {
        //   res.render("user-list", symbols);
        console.log("started to retrieve symbols ...");
      }
    });
    console.log(symbols.length + " symbols were read ...");

    const cciList = symbols.map(
      async (symbol) => await cciIndicator(symbol, true)
    );
    console.table(cciList);
  };
