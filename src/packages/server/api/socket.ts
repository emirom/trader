var socket = require("socket.io-client")("http://localhost:3000");
// import client from "socket.io-client";
// const socket = client('http://localhost:3000');
socket.on("connect", () => {
  console.log("socket connection established ...");
});
socket.on("event", function (data) {
  console.log("data", data);
});
socket.on("disconnect", function () {
  console.log("socket disconnected");
});
