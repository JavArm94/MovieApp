import { TrendingCard } from "../components";
import React from "react";
import styled from "styled-components";
import { useFetchContext } from "../context/fetch_context";
import apiLogo from "../assets/movie_db_logo.svg";
import Loading from "./Loading";
const FeaturedContainer = () => {
  const { records, records_loading } = useFetchContext();

  if (records_loading) {
    return <Loading></Loading>;
  } else if (records.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <Wrapper>
      <div className="container">
        {records.map((record_item) => {
          return (
            <TrendingCard key={record_item.id} {...record_item}></TrendingCard>
          );
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
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.5fr) minmax(0, 1fr);
  grid-gap: 10px;

  .container {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-column-start: 1;
    grid-column-end: 3;
    grid-column-gap: 10px;
  }

  .loading {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    grid-column-start: 1;
    grid-column-end: 3;
    font-size: 1.4rem;
  }

  .loading img {
    filter: blur();
    background-color: black;
    padding-bottom: 10px;
  }

  a {
    height: fit-content;
  }
`;

export default FeaturedContainer;
