function CustomSearchBar({ ...searchBarProps }) {
  return (
    <div>
      <input className="search-bar" placeholder="Search" {...searchBarProps} />
    </div>
  );
}

export default CustomSearchBar;
