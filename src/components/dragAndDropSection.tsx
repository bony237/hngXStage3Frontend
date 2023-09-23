"use client";
import { ImageContext } from "@/archives/imageLibrary";
import clsx from "clsx";
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { imageItem } from "./imagesList";
import Image from "next/image";

type File = { name: string; size: number; type: "image/jpeg" | "image/png" | "image/webp" };

type dataTransferType = {
  files: File[];
  [k: string]: any;
};

// function DragAndDrop() {
//   const [dragging, setDragging] = useState(false);

//   return (
//     <div draggable onDragStart={() => setDragging(true)} onDragEnd={() => setDragging(false)} className={clsx("h-16 bg-gray-800 border", dragging && "bg-blue-300")}>
//       Drag me!
//     </div>
//   );
// }

const DropFrame = ({ children }: { children: React.ReactNode }) => {
  const [dropping, setDropping] = useState(false);

  const [uploadedImages, setUploadedImages] = useState<imageItem[]>([]);

  // console.log({imagesLibrary})
  function addImgToLibrary(data: imageItem): void {
    setUploadedImages([...uploadedImages, data]);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    setDropping(true);
  }
  function handleDrop(e: any) {
    e.preventDefault();
    setDropping(false);
    const dataTransfer: dataTransferType = e.dataTransfer;
    const file: any = dataTransfer.files[0];
    if (validateTheDrop(dataTransfer.files)) {
      addImgToLibrary({
        tag: "local",
        src: URL.createObjectURL(file),
      });
    }
  }

  function validateTheDrop(files: File[]) {
    let result = true;
    if (files.length > 1) {
      toast("Do not drop multiples Images", { type: "error" });
      result = false;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(files[0].type)) {
      toast("Only jpeg, png and webp images are accepted", { type: "error" });
      result = false;
    }

    if (files[0].size > 2000000) {
      toast("The image size should not pass 2Mb", { type: "error" });
      result = false;
    }

    return result;
  }

  return (
    <>
      <ToastContainer />
      <div
        className={clsx("border-4 border-spacing-2 border-dashed w-full h-64 rounded-lg flex justify-center", dropping && "bg-blue-200")}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragOver}
      >
        <div className={clsx(dropping && "text-white", "text-center self-center text-4xl font-bold text-gray-400")}>Drag and Drop</div>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full  ">
        {uploadedImages.map(({ src, tag }, ind) => (
          <div key={ind} className="col-span-1 h-48  relative overflow-hidden rounded">
            <Image src={src} alt={tag} fill className=" object-cover w-48 h-48 " />
          </div>
        ))}
        {children}
      </div>
    </>
  );
};

export default DropFrame;
