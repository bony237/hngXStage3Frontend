"use client";

import { FilterContext } from "@/contexts/filterContext";
import { getLoremImagesData } from "@/services/loremImages";
import { useContext } from "react";
import ImageDiv from "./imageDiv";

const FetchedImagesSection = async () => {
  const { search } = useContext(FilterContext);
  const imagesData = await getLoremImagesData();

  const datas = imagesData.map(({ download_url: src, author: tag }) => ({ src, tag }));

  return (
    <>
      {datas
        .filter((data) => !Boolean(search) || data.tag.toLowerCase().includes(search.toLowerCase()))
        ?.map((data, ind) => (
          <ImageDiv imageData={data} key={ind} />
        ))}
    </>
  );
};

export default FetchedImagesSection;
