import HttpAgent, { HttpsAgent } from "agentkeepalive";

const liveOption = {
  keepAlive: true,
  maxSockets: 10,
};

export const newLiveAgent = () => {
  return {
    agent: {
      http: new HttpAgent(liveOption),
      https: new HttpsAgent(liveOption),
    },
  };
};
