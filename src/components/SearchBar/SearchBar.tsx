import toast, { Toaster } from "react-hot-toast";
import s from "./SearchBar.module.css";

type Props = {
     setQuery: (searchQuery: string) => void;
};

const SearchBar: React.FC<Props> = ({ setQuery }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const searchQuery = (form.elements.namedItem("search") as HTMLInputElement).value;

    if (searchQuery.trim() === "") {
      toast("Search query cannot be empty");
      return;
    }

    setQuery(searchQuery);
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;