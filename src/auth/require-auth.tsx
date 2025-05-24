import React, { useEffect } from "react";

import { UrlState } from "@/context/context";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, fetchUser } = UrlState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <div className="flex justify-center items-center h-screen"><BarLoader /></div>;
  if (!isAuthenticated) return null;
  
  return <>{children}</>;
};
