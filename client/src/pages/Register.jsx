import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Hewan from "/anjingkucing2.png";

function Register() {
  const [name, setName] = useState(""); // State to manage input value
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Save to local storage
  const handleSubmit = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name); // Save name to localStorage
      navigate("/scrabble"); // Navigate to Scrabble page
    }
  };

  // Gradient text
  const styleGradient =
    "bg-gradient-to-r from-[#E1BD82] to-[#A1783F] bg-clip-text text-transparent";

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center px-[5rem]">
        <h1
          className={`text-[5em] text-center uppercase mt-[5rem] font-aptos-semibold ${styleGradient}`}
        >
          fast! <br /> and get the prize
        </h1>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="name" className="text-[3rem] text-white">
            Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className="text-[3rem] rounded-full px-[4rem] mt-[1rem] w-full"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update state on input change
            required
          />
        </div>
        <button
          className="bg-[#FFD388] text-[3rem] uppercase px-[5vw] py-[1vh] rounded-[2rem] mt-[3rem]"
          onClick={handleSubmit} // Call handleSubmit on button click
        >
          Register
        </button>
      </div>
      <div className="absolute bottom-10 right-0 left-0">
        <img
          src={Hewan}
          alt="hewan.png"
          className="bg-cover w-[100%] mx-auto -z-10"
        />
      </div>
    </MainLayout>
  );
}

export default Register;
