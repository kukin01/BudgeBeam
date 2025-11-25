const user = require('../models/user');

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const newUser = await user.create({
      firstName: firstname,
      lastName: lastname,
      email,
      password,
    });
    res.status(201).json({ message: 'User created successfully', user: newUser }); 
    } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}