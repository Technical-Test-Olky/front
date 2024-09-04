import type { Image } from "../types/image";

const ImageList = ({ listImage }: { listImage: Image[] }) => {
  console.log(listImage);
  if (listImage.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-gray-400">No images found</div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-6 gap-4 items-center justify-center">
        {listImage.map((image: Image) => (
          <div className="col-span-1" key={image.id}>
            <div>
              <div className="flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
                <div className="overflow-hidden rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card">
                  <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
                  <div className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info">
                    <div className="poster__info align-self-end w-full">
                      <div className="h-32"></div>
                      <div className="space-y-6 detail_info">
                        <div className="flex flex-col space-y-2 inner">
                          <div className="mb-0 text-lg text-gray-400">
                            {image.name.toLowerCase()}
                          </div>
                        </div>
                        <div className="flex flex-col overview">
                          <div className="flex flex-col"></div>
                          <div className="text-xs text-gray-400 mb-2">
                            Prédiction:
                          </div>
                          <p className="text-xs text-gray-100 mb-6">
                            {image.prediction}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    alt={image.name}
                    className="absolute inset-0 transform w-full -translate-y-4"
                    src={image.mediaLink}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageList;
