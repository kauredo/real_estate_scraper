import React, { useState } from "react";
function Banner() {
  return (
    <header>
      <div
        className=" hidden md:block w-full bg-center bg-cover h-[70vh]"
        style={{
          backgroundImage: "url(/images/banner.jpg)",
        }}
      ></div>
    </header>
  );
}

export default Banner;
