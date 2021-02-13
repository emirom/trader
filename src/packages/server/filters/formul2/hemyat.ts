import { ISymbol } from "../../models/Symbol";

export const hemayat = (s: ISymbol) =>
  (s.pl < s.pf - (s.pf - s.pmin) / 2 &&
    s.pl > s.pmin + (s.pf - s.pmin) / 4 &&
    s.plp <= 1 &&
    s.tno > 10 &&
    s.pf > s.pmin &&
    s.pf > s.py) ||
  (s.pf < s.py && s.plp < 1 && s.tno > 10 && s.pl > s.py) ||
  (s.pl > 1.01 * s.pf &&
    ((s.tno > 10 && s.pf > 1.01 * s.py && s.pl != s.tmax) ||
      (s.pl > 1.02 * s.pf &&
        ((s.tno > 10 && s.pl != s.tmax) ||
          (s.pf < 1.01 * s.pmin &&
            s.plp <= 1 &&
            s.tno > 10 &&
            s.pl > 1.02 * s.pmin)))));
