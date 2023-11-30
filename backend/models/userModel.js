// NEED CHANGE BASED ON USER ROLES !!!
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // What does this admin mean ????
    isAdmin: { type: Boolean, required: true, default: false }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;