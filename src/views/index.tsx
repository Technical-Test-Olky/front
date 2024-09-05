import { useState, useEffect } from "react";
import ImageList from "../components/images-list";
import { SearchBar } from "../components/search-bar";
import { usePhotoLibrary } from "../features/photo-library/hooks/use-photo-library";
import { delayRequest } from "../features/utils";

function App() {
  const { results, search, upload, get, totalPages, totalItems } =
    usePhotoLibrary();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleLimit = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
    await get(0, newLimit);
  };

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    await get(newPage - 1, limit);
  };

  useEffect(() => {
    if (results.length === 0) {
      delayRequest(
        "search",
        () => {
          get(currentPage - 1, limit);
        },
        { timeout: 3000, doInitialCall: true }
      );
    }
  }, [currentPage, limit, get]);

  return (
    <>
      <div className="relative block m-auto w-full max-w-lg p-4">
        <SearchBar
          onSearch={async (query) => {
            await search(query);
          }}
          onUpload={async (file) => {
            await upload(file, limit);
          }}
        />
        <select onChange={(e) => handleLimit(e)}>
          <option value="0">All</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className="mx-12 my-5 justify-center items-center">
        <ImageList listImage={results} />
      </div>
      <div className="flex items-center justify-between mx-12 my-5 p-4 bg-gray-100 border-gray-300 rounded">
        <button
          disabled={
            currentPage - 1 <= 0 || currentPage === 1 || totalPages === 1
          }
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 text-white bg-blue-500 rounded-md shadow-md transition-colors duration-300 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} sur {totalPages} ({totalItems} Images)
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 text-white bg-blue-500 rounded-md shadow-md transition-colors duration-300 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
