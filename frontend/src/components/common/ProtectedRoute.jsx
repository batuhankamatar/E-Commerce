import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isVerifying } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isVerifying) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FAFAFA] font-['Montserrat']">
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold text-sm">
            Oturum doğrulanıyor...
          </p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
