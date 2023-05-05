import React, { useEffect } from "react";
import styled from "styled-components";
import { useFetchContext } from "../context/fetch_context";
import { Link } from "react-router-dom";

const Filter = () => {
  const {
    setFilterMedia,
    setFilterCriteria,
    setPageIndex,
    filterMedia,
    filterUser,
    isSearching,
  } = useFetchContext();

  const clickedBtn = (filter, e, btnType) => {
    if (!e.target.classList.contains("clicked")) {
      clearClicked(btnType);
      if (btnType === "filterBtnPrimary") {
        if (filterMedia === "all" || filterMedia === "media") {
          setFilterMedia("movie");
        }
        setFilterCriteria(filter);
        topRatedSelection();

        e.target.classList.add("clicked");
      } else {
        setFilterMedia(filter);

        e.target.classList.add("clicked");
      }
      setPageIndex(1);
    }
  };

  const clearClicked = (btn) => {
    const allBtn = document.getElementsByClassName(btn);
    [...allBtn].forEach((element) => {
      element.classList.remove("clicked");
    });
  };

  const setDefault = () => {
    const defaultBtn = document.getElementsByClassName("default");
    const allBtnPrimary = document.getElementsByClassName("filterBtnPrimary");
    defaultBtn[0].classList.add("clicked");
    [...allBtnPrimary].forEach((btn) => {
      btn.disabled = false;
    });
  };

  const topRatedSelection = () => {
    const allBtnSecondary =
      document.getElementsByClassName("filterBtnSecondary");
    allBtnSecondary[0].disabled = !allBtnSecondary[0].disabled;
    if (allBtnSecondary[0].classList.contains("clicked")) {
      allBtnSecondary[0].classList.remove("clicked");
      allBtnSecondary[1].classList.add("clicked");
    }
  };

  const disableOnSearchFav = () => {
    const allBtnPrimary = document.getElementsByClassName("filterBtnPrimary");
    const allBtnSecondary =
      document.getElementsByClassName("filterBtnSecondary");
    [...allBtnPrimary].forEach((btn) => {
      btn.classList.remove("clicked");
      btn.disabled = true;
    });

    [...allBtnSecondary].forEach((btn) => {
      btn.disabled = false;
    });
  };

  useEffect(() => {
    if (isSearching || filterUser) {
      disableOnSearchFav();
    } else {
      setDefault();
    }
  }, [isSearching, filterUser]);

  return (
    <Wrapper>
      <span>
        <Link to={"/"}>
          <button
            onMouseDown={(e) => clickedBtn("trending", e, "filterBtnPrimary")}
            className="filterBtnPrimary clicked default"
          >
            Trending
          </button>
        </Link>
        <Link to={"/"}>
          <button
            onMouseDown={(e) => clickedBtn("topRated", e, "filterBtnPrimary")}
            className="filterBtnPrimary"
          >
            Top rated
          </button>
        </Link>
      </span>
      <span>
        <Link to={"/"}>
          <button
            onMouseDown={(e) => clickedBtn("all", e, "filterBtnSecondary")}
            className="filterBtnSecondary clicked"
          >
            All
          </button>
        </Link>
        <Link to={"/"}>
          <button
            onMouseDown={(e) => clickedBtn("movie", e, "filterBtnSecondary")}
            className="filterBtnSecondary"
          >
            Movies
          </button>
        </Link>
        <Link to={"/"}>
          <button
            onMouseDown={(e) => clickedBtn("tv", e, "filterBtnSecondary")}
            className="filterBtnSecondary"
          >
            Series
          </button>
        </Link>
      </span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 48px;
  background-color: #141414;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
  justify-content: space-around;

  button {
    color: #ffffff;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 1rem;
    border: none;
    margin: 0px 5px;
    cursor: pointer;
    white-space: nowrap;
    background-color: #1e1e1e;
    :hover {
      color: #000000;
      background-color: #ededed;
    }
  }

  .filterBtnPrimary:disabled,
  .filterBtnSecondary:disabled {
    color: #2e2e2e;
    pointer-events: none;
  }

  .clicked {
    color: #000000;
    background-color: #ededed;
  }

  span {
    background-color: #1e1e1e;
    border-radius: 50px;
  }

  @media screen and (max-width: 1300px) {
    grid-row-start: 3;
    grid-column-start: 1;
    grid-column-end: 3;
    padding: 0;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 620px) {
    display: flex;
    width: 480px;
    flex-direction: column;
  }

  @media screen and (max-width: 620px) {
    width: 480px;
    height: max-content;
    background-color: none;
    row-gap: 10px;
    background-color: #000000;
    margin: 0px;
    span {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      padding: 4px;
    }
  }
`;

export default Filter;
