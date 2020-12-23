import { Schema, model, Types } from "mongoose";
import Order from "./Order";

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  postalCode: String,
  orders: [{ type: Types.ObjectId, ref: "Order" }],
  // gender: {
  //   type: Number,
  //   enum: [0, 1],
  //   default: 0,
  // },
});
export default model("User", UserSchema);

// enum Gender {
//   Male = 1,
//   Female = 0,
// }

export interface User {
  firstName?: string;
  lastName?: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  orders: Array<Types.ObjectId | typeof Order>;
  // gender: Gender
  // creditCards?: Map<string, string>
}

// Virtuals
// UserSchema.virtual("fullName").get(function () {
//   return this.firstName + this.lastName;
// });

// Methods
// UserSchema.methods.getGender = function() {
//   return this.gender > 0 ? "Male" : "Female"
// }

// Not directly exported because it is not recommended to
// use this interface direct unless necessary since the
// type of `order` field is not deterministic
interface UserBaseDocument extends User, Document {
  getGender(): string;
}

// Export this for strong typing
export interface UserDocument extends UserBaseDocument {
  fullName: string;
  // orders: Types.Array<Order>;
}

// // Export this for strong typing
// export interface UserPopulatedDocument extends UserBaseDocument {
//   orders: Order
// }

// Static methods
UserSchema.statics.findOrdersOfUser = async function (id) {
  return this.findById(id).populate("orders").exec();
};
