export const ApiClient = {
  search: async (query: string) => {
    const response = await fetch(
      `http://localhost:8083/images/search?key=${encodeURIComponent(query)}`
    );
    return response.json();
  },

  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("dataFile", file);

    const res = await fetch("http://localhost:8083/images/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Failed to upload file");
    }
  },

  get: async (page: number, size: number) => {
    const res = await fetch(
      `http://localhost:8083/images?page=${page}&size=${size}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch images");
    }

    return await res.json();
  },
};
