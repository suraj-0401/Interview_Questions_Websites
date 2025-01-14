const express = require("express");
const { createSubmission, getSubmissions, getUserSubmissions } = require("../controllers/submissionController");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.post("/createSubmission",authenticateToken,createSubmission);
router.get("/getSubmission", getSubmissions);
router.get("/getUserSubmission",authenticateToken, getUserSubmissions);

module.exports = router;
