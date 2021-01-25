import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: [true, 'required'] },
		email: { type: String, required: [true, 'required'], unique: true },
		password: { type: String, required: [true, 'required'] },
		isAdmin: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true }
)

// !arrow function is NOT supported
// Compare entered password to the password hash
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}
// Encrypt password to salt & hash
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
