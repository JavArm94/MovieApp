import React from "react";
import { useFetchContext } from "../context/fetch_context";
import styled from "styled-components";

const Pagination = () => {
  const { pageIndex, setPageIndex, records_loading, records, lastPage } =
    useFetchContext();
  let nextPage = pageIndex + 1;
  let prevPage = pageIndex - 1;
  let pages = [prevPage, pageIndex, nextPage];
  const setPageScroll = (page) => {
    setPageIndex(page);
    window.scroll(0, 0);
  };
  if (!records_loading && records.length !== 0) {
    return (
      <Wrapper>
        <div className="pagination">
          {pages.map((page) => {
            if (page > 0 && page <= lastPage) {
              return (
                <button
                  key={page}
                  onClick={() => setPageScroll(page)}
                  className={pageIndex == page ? "primary" : "secondary"}
                >
                  {page}
                </button>
              );
            }
          })}
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  width: 200px;
  margin: auto;
  justify-content: center;
  padding: 20px 0px;

  .pagination {
    display: flex;
    justify-content: center;
    background-color: #141414;
    padding: 10px;
    border-radius: 50px;
    gap: 5px;
    align-items: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 5px;
    border-radius: 20px;
    font-size: 20px;
    border: none;
  }

  .primary {
    font-size: 20px;
    height: 40px;
    width: 40px;
  }
  .secondary {
    height: 30px;
    width: 30px;
    font-size: 16px;
    color: white;
    background-color: #141414;
  }

  .secondary:hover {
    background-color: white;
    color: black;
  }
`;

export default Pagination;
