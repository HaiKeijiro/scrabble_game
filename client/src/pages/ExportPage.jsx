import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

const ExportPage = () => {
  const [csvLink, setCsvLink] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/export")
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        setCsvLink(url);
      });
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center text-main">
        <h1 className="text-[5rem]">Export User Data</h1>
        <a
          href={csvLink}
          download="users.csv"
          className="bg-[#FFD388] text-[3rem] uppercase px-[5vw] py-[1vh] rounded-[2rem] mt-[3rem]"
        >
          Download CSV
        </a>
      </div>
    </MainLayout>
  );
};

export default ExportPage;
