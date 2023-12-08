import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // // attach a profile image to this email
    // avatar: String,
    // // The original design: this example admin is equivalent to "seller" in this case.
    // isAdmin: { type: Boolean, required: true, default: false }
    // 3 User Roles: 
    role: { type: String, required: true, enum: ["ADMIN", "SELLER", "BUYER"], default: "BUYER" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;