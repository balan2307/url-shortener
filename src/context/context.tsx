import useFetch from "@/hooks/user-fetch";
import { useContext, useEffect } from "react";
import { createContext } from "react";
import { getCurrentUser } from "@/db/api.auth";

interface UrlContextParams {
  user: any;
  fetchUser: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialValues: UrlContextParams = {
  user: {},
  fetchUser: () => {},
  isAuthenticated: false,
  loading: false,
};

const UrlContext = createContext<UrlContextParams>(initialValues);

const UrlProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    loading,
    fn: fetchUser,
  } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role == "authenticated";

  return (
    <UrlContext.Provider value={{ user, fetchUser, isAuthenticated, loading }}>
      {children}
    </UrlContext.Provider>
  );
};

export default UrlProvider;

export const UrlState = () => {
  return useContext(UrlContext);
};
