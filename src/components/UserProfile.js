import React from "react";
import styled from "styled-components";
import { useFetchContext } from "../context/fetch_context";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { setFilterUser, setFilterCriteria, filterUser } = useFetchContext();
  const navigate = useNavigate();
  const favFilter = () => {
    setFilterUser(!filterUser);
    setFilterCriteria("trending");
    navigate("/");
  };

  return (
    <Wrapper>
      <span>Your</span>
      <button
        onClick={() => favFilter()}
        className={filterUser ? "selected" : ""}
      >
        Favorites
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background-color: #141414;
  border-radius: 50px;
  height: 40px;
  padding: 4px;
  width: 100%;

  span {
    background-color: #1e1e1e;
    padding: 10px 10px;
    border-radius: 50px;
    letter-spacing: 0.4rem;
  }

  .selected {
    color: #000000;
    background-color: #ededed;
  }

  button {
    height: 38px;
    color: #ffffff;
    background-color: #141414;
    border-radius: 20px;
    border: none;
    margin: 5px 5px;
    cursor: pointer;
    white-space: nowrap;
    font-size: 1rem;

    :hover {
      color: #000000;
      background-color: #ededed;
    }
  }

  @media screen and (max-width: 1300px) {
    width: auto;
    grid-row-start: 2;
    grid-column-start: 2;
  }

  @media screen and (max-width: 620px) {
    width: 480px;
  }
`;

export default UserProfile;
