fetch(
  "https://online.agah.com/Watch/GetInstrumentDescription?isin=IRO1SBAH0001",
  {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      cookie:
        "_ga=GA1.2.57717926.1593920652; ASP.NET_SessionId=1pdawjx51vjcfqmjp3adnykn; cookiesession1=6CE5E6A1AOB4WVDYLYHFHQWOA4UK7C55; cookiesession4=V7S1JHQMMxeZ5OMTyFOsxurrRMEQGjBrk+EomLz+71NpBajFjiqHNX3+uzOOJ+1fJTGcTiiAZ1r4JXhpmUDke8c134iFYr+bMudB6qoOi5S7RlT90gbCzMV4LkbQyKFjDZoIK48BPPxzDjtgH72c27ClbG8jc+YBFzeOhYKMOHoWtmgIPHwLdg0dXTojuuBsk6W4lu51ZyI=; _gid=GA1.2.75898483.1613107631; Username_COOKIE=DPPv7JwcxNeMvM+qflAqvcF8AG4kdUmgMV4K9G/Bfa9SBem4Rp6J82P3e5xTYr6sytzYEstlVELtb9EQQC/jSvIHBf1k2oORgfsd3Dmr/G4LngDCFj/5Ez+l6HuUmvNsmvwo/zUFjphzgvDoae++o+iMLeV2G3mFaKQpXahAa2vIVJif623IzwuLRo05xxNnu7un0o+RACVxpEQbbKpxvgizv5xCrsIv51GuizPP9g8eZ87y/apgcSsvFByYZowKA+kYIldeexuarcDH2Q3MIdZ8fiHvahcGVjf93Za1r4E103dTMa50He6FK5aKOUL369FZw2O2npsuKHeE37e64w==; .ASAONLINE=CEF05932EBD635C57E1A233FBE9D4CD6B206C5A11EC9D91787D58AFF408919AC2D9B57F0C1611C897DCB62ABDE8A26864E33489C2846EF39619038438D95C182BEE5FF55D875A119ED72B1D5CACA63CFCFE3678045C2035343BB35686A73AD8D407600DF",
    },
    referrer: "https://online.agah.com/",
    referrerPolicy: "no-referrer-when-downgrade",
    body: null,
    method: "GET",
    mode: "cors",
  }
);

fetch("https://online.agah.com/Watch/GetLiveSegmentation?isin=IRO1SBAH0001", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    cookie:
      "_ga=GA1.2.57717926.1593920652; ASP.NET_SessionId=1pdawjx51vjcfqmjp3adnykn; cookiesession1=6CE5E6A1AOB4WVDYLYHFHQWOA4UK7C55; cookiesession4=V7S1JHQMMxeZ5OMTyFOsxurrRMEQGjBrk+EomLz+71NpBajFjiqHNX3+uzOOJ+1fJTGcTiiAZ1r4JXhpmUDke8c134iFYr+bMudB6qoOi5S7RlT90gbCzMV4LkbQyKFjDZoIK48BPPxzDjtgH72c27ClbG8jc+YBFzeOhYKMOHoWtmgIPHwLdg0dXTojuuBsk6W4lu51ZyI=; _gid=GA1.2.75898483.1613107631; Username_COOKIE=DPPv7JwcxNeMvM+qflAqvcF8AG4kdUmgMV4K9G/Bfa9SBem4Rp6J82P3e5xTYr6sytzYEstlVELtb9EQQC/jSvIHBf1k2oORgfsd3Dmr/G4LngDCFj/5Ez+l6HuUmvNsmvwo/zUFjphzgvDoae++o+iMLeV2G3mFaKQpXahAa2vIVJif623IzwuLRo05xxNnu7un0o+RACVxpEQbbKpxvgizv5xCrsIv51GuizPP9g8eZ87y/apgcSsvFByYZowKA+kYIldeexuarcDH2Q3MIdZ8fiHvahcGVjf93Za1r4E103dTMa50He6FK5aKOUL369FZw2O2npsuKHeE37e64w==; .ASAONLINE=CEF05932EBD635C57E1A233FBE9D4CD6B206C5A11EC9D91787D58AFF408919AC2D9B57F0C1611C897DCB62ABDE8A26864E33489C2846EF39619038438D95C182BEE5FF55D875A119ED72B1D5CACA63CFCFE3678045C2035343BB35686A73AD8D407600DF",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});

fetch("https://push30.agah.ir/asa/ping?_=1613203218058", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218059", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218060", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218061", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218062", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218063", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218064", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218065", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218066", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218067", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218068", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218069", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218070", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218071", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218072", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218073", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218074", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218075", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218076", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch(
  "wss://push30.agah.ir/asa/reconnect?transport=webSockets&messageId=d-751ED3A-B%2C0%7CBe26%2C754&clientProtocol=1.5&connectionToken=AQAAANCMnd8BFdERjHoAwE%2FCl%2BsBAAAAuOqTOnKg0Eqrydat7%2FztOQAAAAACAAAAAAAQZgAAAAEAACAAAACH5K7TQz70awjtub7r5DQ8PdJjP6pD7QX2Cph3dnXpzwAAAAAOgAAAAAIAACAAAABbnDra8J2849TaPhQ%2Fmx7jWj%2BuPncnquva1DHNvgT90zAAAADKL4a91oUZag2pKcp0GHCPQ0kFaf4LMXPAvvpgQ2QDwUYRMdKeQIoEMqjTyo1%2BrpRAAAAAhhFqLQGkvp4CQ1IPLnTPg3Hf%2F4H7aiIzbhJ6wvf4ghOFOQ6KsiHs9vJ1KPvQtILr9t9Vc3ZYR5CQNE3X3k%2Bcsw%3D%3D&tid=2",
  {
    headers: {
      "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-websocket-extensions": "permessage-deflate; client_max_window_bits",
      "sec-websocket-key": "I2VjflUH401FqB7EKbiW5A==",
      "sec-websocket-version": "13",
    },
    body: null,
    method: "GET",
    mode: "cors",
  }
);
fetch("https://push30.agah.ir/asa/ping?_=1613203218077", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218078", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218079", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218080", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
fetch("https://push30.agah.ir/asa/ping?_=1613203218081", {
  headers: {
    accept: "text/plain, */*; q=0.01",
    "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
  referrer: "https://online.agah.com/",
  referrerPolicy: "no-referrer-when-downgrade",
  body: null,
  method: "GET",
  mode: "cors",
});
