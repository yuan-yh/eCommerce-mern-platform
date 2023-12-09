import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
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


// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt before saving into the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model("User", userSchema);
export default User;