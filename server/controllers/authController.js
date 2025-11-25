const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (userId) => {
  return jwt.sign({ id: userId}, process.env.JWT_SECRET, { expiresIn: '1h' });
}

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });  
    }
    const newUser = await User.create({
        firstname,
        lastname,
        email,
        password,
    })
    // const token = generateToken(newUser._id);
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        password: newUser.password
      }, 
    //   token 
    });
  } catch(error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user  = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}