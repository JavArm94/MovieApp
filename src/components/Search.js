import React from "react";
import styled from "styled-components";
import searchIcon from "../assets/search.png";
import { useFetchContext } from "../context/fetch_context";

const Search = () => {
  const { fetchRecords, localUserFavRecords, filterUser, setPageIndex } =
    useFetchContext();

  const fetchRecordsPag = (input) => {
    setPageIndex(1);
    fetchRecords(input);
  };
  return (
    <Wrapper>
      <button className="search-btn">
        <img src={searchIcon} alt="" />
      </button>

      <input
        type="text"
        onKeyUp={
          filterUser
            ? (e) => localUserFavRecords(e.target.value)
            : (e) => fetchRecordsPag(e.target.value)
        }
        placeholder="Search"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
  position: relative;

  input {
    border-radius: 50px;
    height: 40px;
    background-color: #141414;
    border: 3px #141414 solid;
    font-size: 1rem;
    color: white;
    text-transform: capitalize;
    text-indent: 50px;
    color: #757575;
    width: 100%;
    padding: 0;
  }

  input:focus {
    outline: none;
  }

  .search-btn {
    position: absolute;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    left: -15px;
    bottom: 23px;
  }
  .search-btn img {
    scale: 0.55;
    height: 40px;
    width: 40px;
    right: 100px;
    top: -12px;
    background-color: #1e1e1e;
    border-radius: 50px;
    padding: 1rem;
  }

  @media screen and (max-width: 1300px) {
    justify-content: start;
    padding-bottom: 0px;
    grid-row-start: 2;
    grid-column-start: 1;
    height: auto;
    .search-btn {
      left: -16px;
      bottom: -15px;
    }
  }

  @media screen and (max-width: 620px) {
    width: 480px;
  }

  @media screen and (max-width: 510px) {
    width: 80vw;
  }
`;

export default Search;
