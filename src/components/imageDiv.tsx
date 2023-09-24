"use client"
import Image from "next/image";
import { imageItem } from "./imagesList";

const ImageDiv = ({ imageData }: { imageData: imageItem }) => {
  return (
    <div className="col-span-1 h-48 relative overflow-hidden rounded">
      <Image src={imageData.src} alt={imageData.tag} fill className=" object-cover w-48 h-48 " />
      <div className="h-10 bg-slate-900/50 w-full absolute bottom-0 flex justify-end items-center px-2">
        <span className="bg-slate-50 rounded-full py-0 px-3 text-sm font-semibold"> # {imageData.tag} </span>
      </div>
    </div>
  );
};

export default ImageDiv;
