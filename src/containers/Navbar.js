import { Search, Filter, UserProfile } from "../components";
import React from "react";
import styled from "styled-components";

const NavBar = () => {
  return (
    <Wrapper>
      <Search></Search>
      <Filter></Filter>
      <UserProfile></UserProfile>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr);
  gap: 10px;
`;

export default NavBar;
