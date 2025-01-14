import React, { useEffect, useState } from "react";
import axios from "axios";

const MySubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const REACT_APP_BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/submissions/getUserSubmission`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSubmissions(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred.");
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading submissions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">User Submissions</h1>
      {submissions.length === 0 ? (
        <p className="text-center text-lg">No submissions found.</p>
      ) : (
        <ul className="space-y-6">
          {submissions.map((submission) => (
            <li
              key={submission._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-300"
            >
              <h2 className="text-xl font-medium">{submission.name}</h2>
              <p className="text-gray-700">
                <strong>Country:</strong> {submission.country}
              </p>
              <p className="text-gray-700">
                <strong>Company:</strong> {submission.company}
              </p>
              <p className="text-gray-700">
                <strong>Questions:</strong> {submission.questions.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MySubmission;
