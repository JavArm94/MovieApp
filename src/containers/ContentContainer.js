import React from "react";
import { CardsContainer, FeaturedContainer } from "../components";
import { useFetchContext } from "../context/fetch_context";
import Pagination from "../components/Pagination";
const ContentContainer = () => {
  const { isSearching, filterUser } = useFetchContext();

  if (isSearching) {
    if (filterUser) {
      return <CardsContainer></CardsContainer>;
    } else {
      return (
        <>
          <CardsContainer></CardsContainer>
          <Pagination></Pagination>
        </>
      );
    }
  } else {
    if (filterUser) {
      return <FeaturedContainer></FeaturedContainer>;
    } else {
      return (
        <>
          <FeaturedContainer></FeaturedContainer>
          <Pagination></Pagination>
        </>
      );
    }
  }
};

export default ContentContainer;
