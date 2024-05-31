"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import addData from "@/firebase/firestore/addData";
import { useEffect, useState } from "react";
import getAllData from "@/firebase/firestore/getData";
import app from "@/firebase/config";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("Listed");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const handleForm = async () => {
    if (!task.trim()) {
      setMessage("Task cannot be empty.");
      return;
    }

    const data = {
      task: task,
      status: status,
      userId: user.uid, // Include the user ID
    };

    const { result, error } = await addData("tasks", data);

    if (result) {
      fetchData();
      setTask("");
    } else if (error) {
      setMessage("Error adding data: " + error.message);
    }
  };

  const fetchData = async () => {
    const { result, error } = await getAllData("tasks", user.uid);

    if (result) {
      setData(result);
    } else if (error) {
      console.log("Error fetching data: " + error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/sign-in");
    } catch (error) {
      console.log("Error signing out: " + error.message);
    }
  };

  useEffect(() => {
    if (user == null) {
      router.push("/sign-in");
    } else {
      fetchData();
    }
  }, [user]);

  return (
    <div className="bg-cover bg-center flex flex-col justify-center items-center min-h-screen bg-custom-gradient">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-3xl">Welcome back!</h1>
          <button
            onClick={handleSignOut}
            className="p-2 bg-red-500 bg-opacity-40 rounded-md text-red-700 font-medium"
          >
            Sign Out
          </button>
        </div>
        <h1 className="font-medium mb-2">Input Task</h1>
        <div className="flex w-full ">
          <input
            type="text"
            value={task}
            onChange={(x) => setTask(x.target.value)}
            className="w-full rounded border border-gray-300 mr-2"
          />
          <button
            onClick={() => handleForm()}
            className="p-2 px-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {message && <p className="text-sm mt-0">{message}</p>}
        <h2 className="font-medium">All Tasks</h2>
        {data.length > 0 && (
          <div className="space-y-2">
            {data.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <p>{item.task}</p>
                <p className="py-1 px-4 bg-blue-700 bg-opacity-20 rounded-lg font-medium text-blue-700">
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
