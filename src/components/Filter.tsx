"use client";
import { FilterContext } from "@/contexts/filterContext";
import React from "react";
import { useContext } from "react";

export default function Filter() {
  const { search, setSearchValue } = useContext(FilterContext);
  return (
    <input
      value={search}
      onChange={(e) => setSearchValue(e.target.value)}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
    />
  );
}
