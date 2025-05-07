import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import { SearchContainer, SearchInputField } from "./Style";
import { use } from "react";

const SearchBar = ({ setSearchTerm, searchTerm = ""}) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue(searchTerm);
  }, [searchTerm]);

  const onSearchInputChange = (event) => {
    setSearchValue(event.target.value);
    setSearchTerm(event.target.value); // remove this line then search would be only on click.
  };

  const onSearchButtonClick = () => {
    setSearchTerm(searchValue);
  };

  return (
    <SearchContainer>
      <SearchInputField
        placeholder="Question Title/Number"
        value={searchValue}
        onChange={onSearchInputChange}
      />
      <SearchIcon
        style={{
          color: "#C6CBD9",
          fontSize: "20px",
          position: "absolute",
          right: "8px",
          cursor: "pointer",
        }}
        onClick={onSearchButtonClick}
      />
    </SearchContainer>
  );
};

export default SearchBar;
