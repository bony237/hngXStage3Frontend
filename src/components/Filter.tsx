"use client";
import { FilterContext } from "@/contexts/filterContext";
import icon_hngx from "@/app/icon.png";
import Image from "next/image";
import React from "react";
import { useContext } from "react";

export default function Filter() {
  const { search, setSearchValue } = useContext(FilterContext);
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image className="mx-auto h-10 w-auto" src={icon_hngx} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">Your Gallery page</h2>
      </div>
      <input
        value={search}
        onChange={(e) => setSearchValue(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
        placeholder="Search images by tag"
      />
    </>
  );
}
