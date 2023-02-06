import Image from "next/image";
import React from "react";

export const BaseHeader = () => {
  return (
    <Image
      className="mx-auto block mb-10 w-20 h-20"
      src={"/logo.png"}
      alt="logo"
      width={170}
      height={170}
    />
  );
};
