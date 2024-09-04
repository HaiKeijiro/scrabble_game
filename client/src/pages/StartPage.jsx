import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

function StartPage() {

  // Gradient text
  const styleGradient =
    "bg-gradient-to-r from-[#E1BD82] to-[#A1783F] bg-clip-text text-transparent";

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center px-[5rem]">
        <h1
          className={`text-[5em] text-center uppercase mt-[5rem] font-aptos-semibold leading-none ${styleGradient}`}
        >
          fast! <br /> and get the prize
        </h1>
        <Link
          to="/register"
          className="bg-[#FFD388] text-[4em] uppercase px-[4rem] py-[1rem] rounded-[2rem] mt-[3rem]"
        >
          join now
        </Link>
      </div>
    </MainLayout>
  );
}

export default StartPage;
