const Submission = require("../models/Submission");
const User = require("../models/User");


exports.createSubmission = async (req, res) => {
  const { name, country, company, questions } = req.body;
  
  if (!name || !country || !company || !questions) {
    return res.status(400).json({ message: "All fields are required." });
  }
  
  const userId=req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  try {
    const submission = new Submission({
      name,
      country,
      company,
      questions,
      userId
    });

    await submission.save();
    res.status(201).json({ message: "Submission created successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error creating submission.", error: err.message });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving submissions.", error: err.message });
  }
};

exports.getUserSubmissions = async (req, res) => {
  try {
    // Ensure req.user is properly populated by the authentication middleware
    const userId = req.user.id; // Get the user ID from req.user
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Fetch submissions for the authenticated user
    const submissions = await Submission.find({ userId });

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving submissions.", error: err.message });
  }
};
