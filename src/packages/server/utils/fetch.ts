import fetch from "node-fetch";

export const ct = () => {
  fetch(
    "http://www.tsetmc.com/tsev2/data/instinfofast.aspx?i=7745894403636165&c=23%20",
    {
      headers: {
        accept: "text/plain, */*; q=0.01",
        "accept-language": "fa-IR,fa;q=0.9,en-US;q=0.8,en;q=0.7",
        "x-requested-with": "XMLHttpRequest",
        cookie:
          "_ga=GA1.2.1341192846.1601560992; __qca=P0-606524733-1601562394914; ASP.NET_SessionId=24cmvfhpalmlig4x0ezr4ccc; ARRAffinity=868b1c51456eb1f1ed869a5fd91f4f5ee0774dbab55d50514df6bb64ec18c628; ASP.NET_SessionId=xv3j1xuyq3vbicns1h4lr21n; _gid=GA1.2.1894134177.1611346937; _gat_gtag_UA_63076930_1=1",
      },
      referrer:
        "http://www.tsetmc.com/Loader.aspx?ParTree=151311&i=7745894403636165",
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "GET",
      mode: "cors",
    }
  ).then((data) => console.log(data));
};
// import http from 'http'

// const agent = new http.Agent({
//     keepAlive: true,
//     maxSockets: 1
// });

// var req2 = http.request({
//     agent: agent,
//     method: "GET",
//     hostname: "localhost",
//     port: 3000
// }, function (res2) {
//     console.log("REQUEST_2");
// });
