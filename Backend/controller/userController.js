const userServices = require('../services/userServices');

exports.userController = async (req, res)=>{
    const { email, password } = req.body;
     console.log("**User Data** " , req.body);
      try {
        const { token, user } = await loginService(email, password);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user
        });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        });
    }
}