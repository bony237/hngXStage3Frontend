
import Image from "next/image";

export type imageItem = {
    src: string;
    tag: string;
  };
  
//   type imageLibraryContext = {
//     uploadedImages: imageItem[];
//     addImgToLibrary: (data: imageItem) => void;
//     isLoading: boolean;
//     setUploadedImages: React.Dispatch<React.SetStateAction<imageItem[]>>;
//   };

export default function ImagesList({ initialImages }: { initialImages: imageItem[] }) {
  //   setImagesLibrary(initialImages);

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {initialImages.map(({ src, tag }, ind) => (
        <div key={ind} className="col-span-1">
          <Image src={src} alt={tag} width={800} height={400} objectFit="cover" className="w-full" />
        </div>
      ))}
      
    </div>
  );
}
