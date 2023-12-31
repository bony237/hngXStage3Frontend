import Filter from "@/components/Filter";
import DropFrame from "@/components/dragAndDropSection";
import FetchedImagesSection from "@/components/fetchedImagesSection";
import { imageItem } from "@/components/imagesList";
import Image from "next/image";
import { Suspense } from "react";

export default function GalleryPage() {
  
  return (
    <div className="flex flex-col items-center p-10 space-y-4 md:w-2/3 xl:w-1/2 w-full mx-auto">
      <Filter />
      <DropFrame>
        <Suspense
          fallback={
            <>
              {(Array.from({length: 10})).map((data, ind) => (
                <div key={ind} className="col-span-1 animate-pulse w-full h-48 relative overflow-hidden rounded bg-slate-200"></div>
              ))}
            </>
          }
        >
          <FetchedImagesSection />
        </Suspense>
      </DropFrame>
    </div>
  );
}
