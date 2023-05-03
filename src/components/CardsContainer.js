import React from "react";
import MovieCard from "./MovieCard";
import styled from "styled-components";
import { useFetchContext } from "../context/fetch_context";
import apiLogo from "../assets/movie_db_logo.svg";
import Loading from "./Loading";
const CardsContainer = () => {
  const { records, records_loading } = useFetchContext();

  if (records_loading) {
    return <Loading></Loading>;
  } else if (records.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <Wrapper>
      <div className="card-container">
        {records.map((record) => {
          return <MovieCard key={record.id} {...record}></MovieCard>;
        })}
      </div>
      <a href="https://www.themoviedb.org/" target="_blank">
        <img src={apiLogo} className="api-logo" />
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.5fr) minmax(0, 1fr);
  width: 1200px;
  margin: auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  .card-container {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
        0,
        1fr
      );
    grid-column-start: 1;
    grid-column-end: 3;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  a {
    height: fit-content;
  }

  @media screen {
  }
`;

export default CardsContainer;
