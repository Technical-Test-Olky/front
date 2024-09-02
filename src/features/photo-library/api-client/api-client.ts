import { toast } from "react-toastify";
import type { Image } from "../../../types/image";

export const ApiClient = {
  search: async (query: string = ""): Promise<Image[]> => {
    const response = await fetch(
      `http://localhost:8080/images/search?name=${encodeURIComponent(query)}`
    );
    return response.json();
  },

  upload: async (file: File): Promise<Image> => {
    const formData = new FormData();
    formData.append("sampleFile", file);

    const res = await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      return {} as Image;
    }

    toast("🦄 Image ajouté à firebase!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    return {} as Image;
  },

  findAll: async (): Promise<Image[]> => {
    const res = await fetch("http://localhost:8080/images");
    if (!res) {
      return [];
    }
    return (await res.json()) as Image[];
  },
};
