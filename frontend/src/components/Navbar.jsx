import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-gray-200">
          Dashboard
        </Link>
        <div className="flex gap-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/submission")}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                New Submission
              </button>
              <button
                onClick={() => navigate("/mysubmission")}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                My Submission
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-200 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
