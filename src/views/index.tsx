import { SearchBar } from "../components/search-bar";
import { usePhotoLibrary } from "../features/photo-library/hooks/use-photo-library";
import ImageList from "../components/images-list";

function App() {
  const { results, search, upload } = usePhotoLibrary();

  return (
    <div>
      <div className="relative block m-auto w-full max-w-lg p-4">
        <SearchBar
          onSearch={async (query) => {
            await search(query);
          }}
          onUpload={async (file) => {
            await upload(file);
          }}
        />
      </div>
      <div>
        <ImageList images={results} />
      </div>
    </div>
  );
}

export default App;
