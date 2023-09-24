import DropFrame from "@/components/dragAndDropSection";
import ImagesList, { imageItem } from "@/components/imagesList";
import { getLoremImagesData } from "@/services/loremImages";
import Image from "next/image";
import { Suspense } from "react";

export default function GalleryPage() {
  return (
    <div className="flex flex-col items-center p-10 space-y-4 md:w-2/3 xl:w-1/2 w-full mx-auto">
      <DropFrame>
        <Suspense fallback={<p>loading</p>}>
          <ImageSection />
        </Suspense>
      </DropFrame>
    </div>
  );
}

const ImageSection = async () => {
  const imagesData = await getLoremImagesData();

  const datas = imagesData.map(({ download_url: src, author: tag }) => ({ src, tag }));

  return (
    <>
      {datas.map((data, ind) => (
        <ImageDiv imageData={data} key={ind} />
      ))}
    </>
  );
};

export const ImageDiv = ({ imageData }: { imageData: imageItem }) => {
  return (
    <div className="col-span-1 h-48 relative overflow-hidden rounded">
      <Image src={imageData.src} alt={imageData.tag} fill className=" object-cover w-48 h-48 " />
      <div className="h-10 bg-slate-900/50 w-full absolute bottom-0 flex justify-end items-center px-2">
         <span className="bg-slate-50 rounded-full py-0 px-3 text-sm font-semibold"> # {imageData.tag} </span>
      </div>
    </div>
  );
};
