"use client";
import React from "react";

export default function PreventDroppingFrame({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-screen" onDragOver={(e) => e.preventDefault()} onDrop={(e) => e.preventDefault()}> {children} </div>;
}
