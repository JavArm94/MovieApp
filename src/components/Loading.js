import React from "react";
import spinner from "../assets/loading.gif";
import styled from "styled-components";
const Loading = () => {
  return (
    <Wrapper>
      <img src={spinner} alt="" />
      <p>Loading...</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  grid-column-start: 1;
  grid-column-end: 3;
  font-size: 1.4rem;

  .loading img {
    filter: blur();
    background-color: black;
    padding-bottom: 10px;
  }
`;

export default Loading;
