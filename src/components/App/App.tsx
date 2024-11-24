import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import fetchImages from "../../services/unsplash-api";
import { Image } from "../../types";

function App() {
   const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false); 
  const [error, setError] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!query) return;
      try {
        setError(false);
        setLoader(true);
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSetQuery = (searchQuery) => {
    if (searchQuery.toLowerCase() === query.toLowerCase()) return;
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const openModal = (image) => {
    setModal(true);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <SearchBar setQuery={handleSetQuery} />
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} openModal={openModal} />
          <ImageModal
            modalIsOpen={modal}
            closeModal={closeModal}
            image={selectedImage}
          />
          {loader ? (<Loader />) : (page < totalPages && <LoadMoreBtn handleLoadMore={handleLoadMore} />)}
        </>
      )}
    </>
  );
}

export default App;