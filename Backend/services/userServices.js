const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.loginUser =  async(email ,password) =>{
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('User not found');
        }
        // Compare the password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET, // Ensure you have a secret key in your environment variables
            { expiresIn: '1h' }
        );

        return { token, user: { id: user._id, email: user.email } };
    } catch (error) {
        throw new Error(error.message);
    }
}