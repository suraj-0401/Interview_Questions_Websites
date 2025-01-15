import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Url";

const SubmissionForm = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [questions, setQuestions] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication token is missing!");
      return;
    }

    // Validate input fields
    if (!name || !country || !company || !questions) {
      alert("All fields are required!");
      return;
    }
    

    // Clean up questions input
    const questionArray = questions
      .split("\n")
      .map((q) => q.trim())  // Trim whitespace
      .filter((q) => q !== ""); // Remove empty lines

    try {
      const response = await axios.post(
        `${baseUrl}/api/submissions/createSubmission`,
        {
          name,
          country,
          company,
          questions: questionArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the response was successful
      if (response.status === 201) {
        alert("Submission created successfully!");
        navigate("/");
      } else {
        throw new Error("Failed to create submission.");
      }
    } catch (error) {
      console.error("Error creating submission:", error.response || error.message);
      alert("Error creating submission. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          New Submission
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Country Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Company Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Questions Textarea */}
        <div className="mb-6">
          <textarea
            placeholder="Questions (one per line)"
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;
