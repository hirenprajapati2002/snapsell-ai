import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePrivateRoutes = () => {
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    if(token == null) {
        navigate('/');
    }
  }, [token, navigate]);

  return;
};

export default usePrivateRoutes;
