import "./SearchBox.scss";

function SearchBox({ searchInput, onSearchInputChange }) {
  return (
    <>
      <div className="search-bar">
        <div className="ui-icon search-icon ">
          <img
            width="12"
            src="/images/search.png"
            className="search-box-icon"
            alt=""
          />
        </div>
        <input
          type="text"
          placeholder="Search files..."
          value={searchInput}
          onChange={(e) => onSearchInputChange(e)}
        />
      </div>
    </>
  );
}

export default SearchBox;
