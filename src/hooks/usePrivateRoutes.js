import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const usePrivateRoutes = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/");
      Swal.fire('You need to login or signup to access this page');
    }
  }, [token, navigate]);

  return;
};

export default usePrivateRoutes;
