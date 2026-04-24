import { useState } from "react";
import API from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSignup = async () => {
    try {
      const res = await API.post("/api/v1/user/signup", form);
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-96">
        <h2 className="text-white text-2xl mb-4">Signup</h2>

        <input
          placeholder="Email"
          className="w-full mb-2 p-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          className="w-full mb-2 p-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          placeholder="First Name"
          className="w-full mb-2 p-2"
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          placeholder="Last Name"
          className="w-full mb-2 p-2"
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />

        <button
          onClick={handleSignup}
          className="bg-blue-500 w-full p-2 text-white"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
