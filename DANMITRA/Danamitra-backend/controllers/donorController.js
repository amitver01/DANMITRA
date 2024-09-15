const Donor = require('../models/donorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Donor
const registerDonor = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let donor = await Donor.findOne({ email });
    if (donor) {
      return res.status(400).json({ message: 'Donor already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    donor = new Donor({ name, email, password:hashedPassword });
    await donor.save();

    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ donor , token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Donor
const loginDonor = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }


    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.cookie('token', token);
    res.status(200).json({ donor , token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//logout donor
const logoutDonor = async (req, res) => {
  try {
    res.cookie('token', "");
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchDonor = async (req, res) => {
  const { _id } = req.body;

  // Validate the _id is present
  if (!_id) {
    return res.status(400).json({ message: 'Donor ID is required' });
  }

  try {
    // Search for the donor by _id
    const donor = await Donor.findById(_id);
    
    // If no donor is found, return a 404 error
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Return the donor data
    res.status(200).json({ donor });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerDonor,
  loginDonor,
  logoutDonor,
  searchDonor
};
