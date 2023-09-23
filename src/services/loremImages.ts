export const getLoremImagesData = async (): Promise<{ id: string; download_url: string; author: string; [key: string]: any }[]> => {
  const res = await fetch("https://picsum.photos/v2/list?page=2&limit=10");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
