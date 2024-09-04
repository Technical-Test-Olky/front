import { useState } from "react";
import { ApiClient } from "../api-client/api-client";
import type { Image } from "../../../types/image";

type PhotoLibraryResult = Image;

export const usePhotoLibrary = () => {
  const [results, setResults] = useState<PhotoLibraryResult[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const search = async (query: string) => {
    setResults(await ApiClient.search(query));
  };

  const upload = async (file: File, limit: number) => {
    await ApiClient.upload(file);
    await get(0, limit);
  };

  const get = async (page: number, size: number) => {
    const results = await ApiClient.get(page, size);
    setResults(results.dataList);
    setTotalItems(results.totalItems || 0);
    setTotalPages(results.totalPages || 1);
  };

  return { results, search, upload, get, totalPages, totalItems };
};
