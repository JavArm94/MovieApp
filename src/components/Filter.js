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
    filterCriteria,
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
        fixTopRatedSelection();
        setPageIndex(1);
        e.target.classList.add("clicked");
      } else {
        setFilterMedia(filter);
        setPageIndex(1);
        e.target.classList.add("clicked");
      }
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

  const fixTopRatedSelection = () => {
    const allBtnSecondary =
      document.getElementsByClassName("filterBtnSecondary");
    allBtnSecondary[0].disabled = !allBtnSecondary[0].disabled;
    if (allBtnSecondary[0].classList.contains("clicked")) {
      allBtnSecondary[0].classList.remove("clicked");
      allBtnSecondary[1].classList.add("clicked");
    }
  };

  const fixDisableOnSearchFav = () => {
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
      fixDisableOnSearchFav();
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 48px;
  background-color: #141414;
  border-radius: 50px;
  display: flex;
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

    :hover {
      color: #000000;
      background-color: #ededed;
    }

    :disabled {
    }
  }

  .filterBtnPrimary {
    background-color: #1e1e1e;
  }
  .filterBtnSecondary {
    background-color: #141414;
  }

  .filterBtnPrimary:disabled {
    color: #2e2e2e;
    pointer-events: none;
  }
  .filterBtnSecondary:disabled {
    background-color: #141414;
    color: #1f1f1f;
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
`;

export default Filter;
