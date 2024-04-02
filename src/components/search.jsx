const SearchBar = ({ handleChange }) => {
  return (
    <div className="searchBar">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search for Countries.."
      />
    </div>
  );
};

export default SearchBar;
