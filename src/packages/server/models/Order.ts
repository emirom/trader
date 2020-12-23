import { Types, Schema, model } from "mongoose";
import User from "./User";

const orderSchema = new Schema({
  deliveryTime: Date,
  symbol: { type: Types.ObjectId, ref: "Product" },
  user: { type: Types.ObjectId, ref: "User" },
});

export default model("Order", orderSchema);

export interface Order {
  deliveryTime: Date;
  user: Array<Types.ObjectId | typeof User>;
}
