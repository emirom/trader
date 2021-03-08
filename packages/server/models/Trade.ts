import { Document, model, Schema } from "mongoose";
import { ISymbol } from "./Symbol";

const TradeSchema = new Schema({
  date: Date,
  inscode: String,
  // userId:ObjectId
  isBuy: Boolean,
  price: Number,
  amount: Number,
  buySellRate: Number,
  buySellW: Number,
  macd: Number,
  macdW: Number,
  cci: Number,
  cciW: Number,
  stoc: Number,
  stocW: Number,
  sum: Number,
});

export default model<ITrade>("Trade", TradeSchema);

export interface ITrade extends Document, TradeOscillator {
  date: Date;
  inscode: string;
  // userId:ObjectId
  isBuy: boolean;
  price: number;
  amount: number;
}

export interface TradeOscillator {
  buySellRate: number;
  buySellW: number;
  macd: number;
  macdW: number;
  cci: number;
  cciW: number;
  stoc: number;
  stocW: number;
  score: number;
}

export interface TradeSymbol extends TradeOscillator {
  symbol: ISymbol;
}
