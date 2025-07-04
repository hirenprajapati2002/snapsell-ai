import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const usePrivateRoutes = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for auth context to finish loading
    if (!isLoading) {
      if (!user) {
        navigate('/');
      }
    }
  }, [user, isLoading, navigate]);

  return;
};

export default usePrivateRoutes;
