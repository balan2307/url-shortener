import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import * as yup from "yup";
import Error from "./error";
import { signUp } from "../db/api.auth.ts";
import useFetch from "@/hooks/user-fetch.js";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

type FormErrors = {
  email?: string;
  password?: string;
  name?: string;
  profile_pic?: string;
};

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { data, error, fn: fnSignUp, loading } = useFetch(signUp, formData);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const longLink = searchParams.get("createNew");

  function setFormInput(e: React.FormEvent) {
    const { name, value, files } = e.target as HTMLInputElement;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: files ? files[0] : value,
      };
    });
  }
  useEffect(() => {
    if (error == null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [data, error]);

  async function handleSubmit(e: React.FormEvent) {
    setErrors({});

    e.preventDefault();

    try {
      const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        profile_pic: yup.mixed().required(),
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
      await fnSignUp();
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
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={(e) => setFormInput(e)}
          ></Input>
          {errors?.name && <Error message={errors.name}></Error>}
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

          <Input
            className="outline-none focus:outline-none font-medium"
            placeholder="Enter password"
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={(e) => setFormInput(e)}
          ></Input>
          {errors?.profile_pic && <Error message={errors.profile_pic}></Error>}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-start">
          <Button
            className="cursor-pointer"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? <BeatLoader size={15} /> : "Create account"}
          </Button>

          {error?.message && <Error message={error?.message} />}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
