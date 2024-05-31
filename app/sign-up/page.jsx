"use client";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage(
          <h1 className="bg-red-500 bg-opacity-30 text-red-700 text-center p-2 mt-2">
            This email is already in use. Please use a different email address.
          </h1>
        );
      } else {
        console.error("Error:", error);
        setMessage(
          <h1 className="bg-red-500 bg-opacity-30 text-red-700 text-center p-2 mt-2">
            Sign up failed. Please try again.
          </h1>
        );
      }
    } else if (result) {
      setMessage(
        <h1 className="bg-green-500 bg-opacity-30 text-green-700 text-center p-2 mt-2">
          Sign up successful. Redirecting...
        </h1>
      );
      router.push("/admin");
    }
  };
  return (
    <div className="bg-cover bg-center flex justify-center items-center h-screen bg-custom-gradient">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-8">Sign up</h1>
        <form onSubmit={handleForm} className="flex flex-col">
          <label htmlFor="email" className="mb-4">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="p-2 mb-4 rounded border border-gray-300 w-full"
            />
          </label>
          <label htmlFor="password" className="mb-4">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="p-2 rounded border border-gray-300 w-full"
            />
          </label>

          <div className="text-center mb-4">
            <h1 className="text-center">or</h1>
            <h1
              className="hover:cursor-pointer underline"
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </h1>
          </div>
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        {message}
      </div>
    </div>
  );
}

export default Page;
