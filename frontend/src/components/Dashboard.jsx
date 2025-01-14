import React, { useEffect, useState } from "react";
import { api } from "../api";
import axios from "axios";

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const REACT_APP_BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/submissions/getSubmission`);
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Interview Submissions</h2>
  {submissions.map((submission) => (
    <div key={submission._id} className="mb-6 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700">{submission.name}</h3>
      <p className="text-gray-600">
        <strong>Country:</strong> {submission.country}
      </p>
      <p className="text-gray-600">
        <strong>Company:</strong> {submission.company}
      </p>
      <ul className="mt-4 space-y-2">
        {submission.questions.map((question, index) => (
          <li key={index} className="text-gray-600">
            <strong>Questions:</strong> {question}
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>

  );
};

export default Dashboard;