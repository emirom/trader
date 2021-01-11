import HttpAgent, { HttpsAgent } from "agentkeepalive";

const liveOption = {
  keepAlive: true,
  maxSockets: 10,
};

export const newAliveAgent = () => {
  return {
    agent: {
      http: new HttpAgent(liveOption),
      https: new HttpsAgent(liveOption),
    },
  };
};

/**
 * resolved issue of keep live in got
 * @link https://github.com/sindresorhus/got/issues/815
 */
