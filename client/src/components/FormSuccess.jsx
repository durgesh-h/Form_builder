import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Home } from "lucide-react";

export function FormSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-sm transform transition-transform hover:scale-105">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-400 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          Thank You!
        </h1>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Your form has been submitted successfully. We appreciate your time!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full hover:bg-indigo-600 transform transition-all"
        >
          <Home size={22} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
