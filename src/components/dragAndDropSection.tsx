"use client";
import clsx from "clsx";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { imageItem } from "./imagesList";

import { FilterContext } from "@/contexts/filterContext";
import ImageDiv from "./imageDiv";

type File = { name: string; size: number; type: "image/jpeg" | "image/png" | "image/webp" };

type dataTransferType = {
  files: File[];
  [k: string]: any;
};

// function DragAndDrop() {
//   const [dragging, setDragging] = useState(false);

//   return (
//     <div draggable onDragStart={() => setDragging(true)} onDragEnd={() => setDragging(false)} className={clsx("h-16 bg-gray-800 border", dragging && "bg-sky-300")}>
//       Drag me!
//     </div>
//   );
// }

const DropFrame = ({ children }: { children: React.ReactNode }) => {
  const [dropping, setDropping] = useState(false);
  const { search, setSearchValue } = useContext(FilterContext);

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
    setSearchValue("");
    const dataTransfer: dataTransferType = e.dataTransfer;
    const file = dataTransfer.files[0];
    console.log(file);
    if (validateTheDrop(dataTransfer.files)) {
      addImgToLibrary({
        tag: file.name.split(".")[0],
        src: URL.createObjectURL(file as any),
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

  const uploadedImagesToShow = uploadedImages.filter((data) => !Boolean(search) || data.tag.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <ToastContainer />
      <div
        className={clsx("border-4 border-spacing-2 border-dashed w-full h-64 rounded-lg flex justify-center", dropping && "bg-sky-200")}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragOver}
      >
        <div className={clsx(dropping && "text-white", "text-center self-center text-xl md:text-4xl font-bold text-gray-400")}>Drag and Drop</div>
      </div>

      <div className="peer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full">
        {uploadedImagesToShow?.map((data, ind) => (
          <ImageDiv imageData={data} key={ind} />
        ))}
        {children}
      </div>
      <div className="invisible peer-empty:visible">Not found!</div>
    </>
  );
};

export default DropFrame;
