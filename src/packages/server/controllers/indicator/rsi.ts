// // کد فیلترنویسی اندیکاتور Rsi

// true==function()

// {

// var sumgain=function(ih)

// {

// var gain=0;
// var n;

// for(n=0; n < 14; n++)
// {
// if ( ih [n].PClosing > ih [n].PriceYesterday )
// {
// gain += ( ih [n].PClosing – ih [n].PriceYesterday );
// }
// }
// return gain/14;

// };

// var sumloss=function()

// {

// var loss=0;
// var n;

// for(n=0; n < 14; n++)
// {
// m=n+11
// if ( ih[n].PClosing < ih[n].PriceYesterday )
// {
// loss += – ( ih [n].PClosing – ih [n].PriceYesterday );
// }
// }
// return loss/14;

// };

// (cfield0)=sumgain();
// (cfield1)=sumloss();
// (cfield2)=Math.round(100-(100/(1+(cfield0)/(cfield1))));

// return true;

// }()

// var VD

// if ( (cfield2) < 30 && (tvol)>10000 ) {
// VD=”خرید”
// }
// else
// {

// if ( (cfield2) > 70 && (tvol)>10000 ) {
// VD=”فروش”
// }
// else
// {
// VD=””
// }

// }

// (cfield1)=VD
