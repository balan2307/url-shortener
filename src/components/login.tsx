import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import * as yup from "yup";
import Error from "./error";
import { login } from "../db/api.auth.ts";
import useFetch from "@/hooks/user-fetch.js";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {BeatLoader} from 'react-spinners'
import { UrlState } from "@/context/context.tsx";

type FormErrors = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const { data, error, fn: fnLogin ,loading } = useFetch(login, formData);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {fetchUser}=UrlState()

  const longLink = searchParams.get("createNew");

  function setFormInput(e: React.FormEvent) {
    const { name, value } = e.target as HTMLInputElement;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  useEffect(() => {
    if (error == null && data) {
      fetchUser()
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [data, error]);

  async function handleSubmit(e: React.FormEvent) {
    setErrors({});

    e.preventDefault();

    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email("Invalid Email")
          .required("Email is required"),
        password: yup
          .string()
          .min(6, "Password must be of min 6 length")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
    } catch (e: any) {
      let newErrors: { [key: string]: string } = {};

      e?.inner?.forEach((err: any) => {
        newErrors[err?.path] = err.message;
      });

      setErrors(newErrors);
    }
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          {/* <CardDescription className="text-md">Login to your account if you already have one</CardDescription> */}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            className="outline-none focus:outline-none font-medium"
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={(e) => setFormInput(e)}
          ></Input>
          {errors?.email && <Error message={errors.email}></Error>}
          <Input
            className="outline-none focus:outline-none font-medium"
            placeholder="Enter password"
            name="password"
            type="password"
            onChange={(e) => setFormInput(e)}
          ></Input>
          {errors?.password && <Error message={errors.password}></Error>}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-start">
          <Button
            className="cursor-pointer"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? <BeatLoader size={15} /> : 'Login'}
          </Button>

          {error?.message && <Error message={error?.message} />}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
