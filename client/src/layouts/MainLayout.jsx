import React from "react";
import Logo from "/logo.png";

function MainLayout({ children }) {
  return (
    <div className="w-full h-screen border-8 border-main py-20">
      <div className="logo">
        <img src={Logo} alt="logo.png" className="w-[35%] mx-auto" />
      </div>
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
