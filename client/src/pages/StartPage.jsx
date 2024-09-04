import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

function StartPage() {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center px-[5rem]">
        <h1 className="text-[5rem] text-main text-center uppercase mt-[5rem]">
          fast! <br /> and get the prize
        </h1>
        <Link to="/register"
          className="bg-[#FFD388] text-[3rem] uppercase px-[5vw] py-[1vh] rounded-[2rem] mt-[3rem]"
        >
          join now
        </Link>
      </div>
    </MainLayout>
  );
}

export default StartPage;
