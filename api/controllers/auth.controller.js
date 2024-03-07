import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";


//For signup
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === "" || email === "" || password === ""){
        next(errorHandler(400, `All fields are required`));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json(`Signup successful`);
    } catch (error) {
        
        next(error);
    }
};

// For signin
export const signin = async(req, res, next)=>{
    const { email, password } = req.body;

    if(!email || !password || email === "" || password === ""){

        next(errorHandler(400,`All fields are required`));
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, "User not found"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400, "Invalid Password"));
        }
        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);
        
        const  { password: pass, ...rest } = validUser._doc
        res.status(200)
        .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
    } catch (error) {
        next(error);
    }
}


//For google account
export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign(
          { id: newUser._id, isAdmin: newUser.isAdmin },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };

  // For forgotPassword
  export const forgotPassword = async (req, res, next) => {
    try {
      //get user based on email  
      const user = await User.findOne({email: req.body.email})
      if(!user) {
        return next(errorHandler(404, `Can not find User with this given email.`))
    }
      // generate random token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
     
      user.resetPasswordToken = hashedResetToken;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();

      const resetLink = `${req.protocol}://${req.get('host')}/reset-password?token=${hashedResetToken}`;
      const message = `You have received a password reset request. Please use the below link to reset your password\n\n${resetLink}\n\nThis password valid for only 1 hour`
      const emailOptions = {
        email: user.email,
        subject: 'Recovery Password',
        message: message,
      };

      await sendEmail(emailOptions);

      res.json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
      next(error);
    }
  };


  export const resetPassword = async (req, res, next) => {
    try {
      // Get the token from the request parameters
      const token = req.params.token;
      // Find the user with the matching token and a valid expiration time
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      // Check if the user is found
      if (!user) {
        return next(errorHandler(400, `Token is invalid or has expired`));
      }
      // Set the new password and clear reset token fields
      const newPassword = req.body.password;
      const hashedPassword = bcryptjs.hashSync(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      const loginToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({
        success: true,
        message: 'Password reset successful.',
        token: loginToken,
      });
    } catch (error) {
      console.error('Error in resetPassword:', error);
      next(error);
    }
  };