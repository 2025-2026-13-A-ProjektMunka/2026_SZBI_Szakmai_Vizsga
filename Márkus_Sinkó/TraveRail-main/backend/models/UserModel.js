import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	nev : { type: String, required: true },
	email : { type: String, required: true, unique: true },
	jelszo : { type: String, required: true },
	role : { type: String, default: 'customer' }
}, {
	timestamps: true
});

const User = mongoose.model('user', userSchema);

export default User;