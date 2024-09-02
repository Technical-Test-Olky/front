import { useState } from "react";
import { ApiClient } from "../api-client/api-client";
import { Image } from "../../../types/image";

export const usePhotoLibrary = () => {
  const [results, setResults] = useState<Image[]>([]);

  const search = async (query: string) => {
    setResults(await ApiClient.search(query));
  };

  const upload = async (file: File) => {
    await ApiClient.upload(file);
  };

  const findAll = async () => {
    await ApiClient.findAll();
    setResults(await ApiClient.findAll());
  };

  return { results, search, upload, findAll };
};
