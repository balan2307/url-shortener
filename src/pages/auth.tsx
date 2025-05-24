import React, { useEffect } from "react";
import { useNavigate, useRouteError, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/login";
import Signup from "@/components/signup";
import { UrlState } from "@/context/context";
const Auth = () => {
  const [searchParams] = useSearchParams();
  const {isAuthenticated ,loading}=UrlState()
  const longLink=searchParams.get('createNew')
  const navigate=useNavigate()


  useEffect(()=>{

    if(isAuthenticated  && !loading){

      if(searchParams.get('createNew')){
        navigate(`/dashboard/createNew=${longLink}`)
      }
      else navigate('/dashboard')

    }
  },[isAuthenticated,loading])

  return (
    <div className="flex flex-col items-center font-extrabold text-2xl">
      <h1>
        {longLink
          ? "Hold on ! You need to login first"
          : "Login/Signup"}
      </h1>

      <Tabs defaultValue="login" className="md:w-[400px] flex items-center mt-4">
        <TabsList className="w-full ">
          <TabsTrigger value="login" className="cursor-pointer">Login</TabsTrigger>
          <TabsTrigger value="signup" className="cursor-pointer">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="w-full">
          <Login />
        </TabsContent>
        <TabsContent value="signup" className="w-full">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
