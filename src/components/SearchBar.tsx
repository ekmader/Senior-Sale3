interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search items..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />
    </div>
  );
};

export default SearchBar;