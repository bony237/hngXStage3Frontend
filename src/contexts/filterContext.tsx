"use client";
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface FilterContextProps {
  search: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const FilterContext = createContext<FilterContextProps>({
  search: "",
  setSearchValue: () => "",
});

export default function FilterProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  return <FilterContext.Provider value={{ search, setSearchValue: setSearch }}>{children} </FilterContext.Provider>;
}
