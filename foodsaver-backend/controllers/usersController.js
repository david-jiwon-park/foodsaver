const db = require('knex')(require('../knexfile'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Sign-up
const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required.',
    });
  }

  try {
    const users = await db('users').where({ email: email });

    if (users.length !== 0) {
      return res.status(400).json({
        message: 'This email has already been used. Please use another email.',
      });
    }

    const newUser = await db('users').insert({
      name: name,  
      email: email,
      password: bcrypt.hashSync(password, 10),
    });

    const newUserCreated = newUser[0];
    
    const token = jwt.sign({ id: newUser[0] }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.status(201).json({
      message: 'User created successfully.',
      user: newUserCreated,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'There was an issue with creating your account. Please try again later.',
    });
  }
};

// User Login
const loginUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'Login requires both email and password fields.' });
  }
  try {
    const users = await db('users').where({ email: req.body.email });
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid login credentials.' });
    }
    const user = users[0];
    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return res.status(200).json({
      message: 'User has logged in successfully',
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: 'There was an error with the server. Please try logging in later.' });
  }
};

// Getting User Information 
const getUser = async (req, res) => {
    const userId = req.userData.id; 
    try {
        const user = await db("users").where("id", userId).first();
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const filteredUserInfo = {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at
        };
        res.status(200).json(filteredUserInfo);
    } catch (error) {
        res.status(500).json({ message: 'There was an error with the server' });
    }
};

// Editing User Information 
const editUser = async (req, res) => {
    const userId = req.userData.id; 
    try {
        const updatedData = await db("users").where("id", userId).update({
          name: req.body.name, 
          email: req.body.email,
          // password: bcrypt.hashSync(req.body.password, 10)
        });
        if (updatedData === 0) {
          return res.status(404).json({ error: "User not found" });
        } 
        res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: 'There was an error with the server' });
    }
};

// Changing User Password 
const changePassword = async (req, res) => {
  const userId = req.userData.id; 
  try {
      const updatedData = await db("users").where("id", userId).update({
        password: bcrypt.hashSync(req.body.password, 10)
      });
      if (updatedData === 0) {
        return res.status(404).json({ error: "User not found" });
      } 
      res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: 'There was an error with the server' });
  }
};

// Deleting User 
const deleteUser = async (req, res) => {
    const userId = req.userData.id; 
    const userExists = await db("users").where("id", userId).first();
    if (!userExists) {
        return res.status(404).json({ error: "User not found" });
    }
    try {
        await db("users").where("id", userId).del();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'There was an error with the server' });
    }
};

module.exports = {
  signUpUser,
  loginUser,
  getUser,
  editUser, 
  changePassword,
  deleteUser
};