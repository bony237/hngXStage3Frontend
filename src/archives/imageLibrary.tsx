"use client";
import { getLoremImagesData } from "@/services/loremImages";
import React, { createContext, useState, useMemo } from "react";

type imageItem = {
  src: string;
  tag: string;
};

type imageLibraryContext = {
  uploadedImages: imageItem[];
  addImgToLibrary: (data: imageItem) => void;
  isLoading: boolean;
  setUploadedImages: React.Dispatch<React.SetStateAction<imageItem[]>>;
};

// @ts-ignore
export const ImageContext = createContext<imageLibraryContext>({});

export default async function ImageLibraryProvider({ children }: { children: React.ReactNode }) {
  const [uploadedImages, setUploadedImages] = useState<imageItem[]>([]);

  const initialContextValue = useMemo(() => ({
    uploadedImages,
    addImgToLibrary: (data: imageItem) => setUploadedImages([...uploadedImages, data]),
    isLoading: false,
    setUploadedImages,
  }), [uploadedImages]);

  return <ImageContext.Provider value={initialContextValue}>{children}</ImageContext.Provider>;
}
