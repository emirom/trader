import { Types, Schema, model, Document } from "mongoose";
import { IUser } from "./User";

const orderSchema = new Schema({
  deliveryTime: Date,
  symbol: { type: Types.ObjectId, ref: "Product" },
  user: { type: Types.ObjectId, ref: "User" },
});

export interface IOrder extends Document {
  deliveryTime: Date;
  user: Array<Types.ObjectId | IUser>;
}

export default model<IOrder>("Order", orderSchema);
