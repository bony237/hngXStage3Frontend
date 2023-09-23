import DropFrame from "@/components/dragAndDropSection";
import ImagesList from "@/components/imagesList";
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

  const data = imagesData.map(({ download_url: src, author: tag }) => ({ src, tag }));

  return (
    <>
      {data.map(({ src, tag }, ind) => (
        <div key={ind} className="col-span-1 h-48 relative overflow-hidden rounded">
          <Image  src={src} alt={tag} fill className=" object-cover w-48 h-48 " />
        </div>
      ))}
    </>
  );
};
