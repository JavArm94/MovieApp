import React, { useContext, useEffect, useReducer } from "react";
import styled from "styled-components";
import { poster_url as poster } from "../utils/constants";
import { createBgImg } from "../utils/helpers";
import { useParams, Link, useLocation } from "react-router-dom";
import { useFetchContext } from "../context/fetch_context";
import apiLogo from "../assets/movie_db_logo.svg";
const SingleRecordPage = () => {
  const { id, media_type } = useParams();
  const { single_record, single_record_loading, fetchSingleRecord } =
    useFetchContext();
  const {
    overview: description,
    title,
    poster_path,
    release_date,
    first_air_date,
  } = single_record["singleRecord"] ? single_record["singleRecord"] : "";
  const location = useLocation();

  const changeMovie = (media_type, id) => {
    fetchSingleRecord(media_type, id);
  };

  useEffect(() => {
    fetchSingleRecord(media_type, id);
  }, [location]);

  if (single_record_loading) {
    return <Wrapper>Loading...</Wrapper>;
  }

  if (
    single_record["directorInfo"] &&
    single_record["directorRecords"].length > 0
  ) {
    return (
      <Wrapper>
        <section className="movie-poster">
          <h1>{title}</h1>
          <div
            className="poster"
            style={{
              backgroundImage: `url(${createBgImg(poster, poster_path)})`,
            }}
          ></div>
        </section>
        <section className="movie-details">
          <h2>Description</h2>
          <p>{description}</p>
          <h3>Cast</h3>
          <p>
            {single_record["cast"].map((person, i, row) => {
              if (i + 1 === row.length) {
                return person.name + ".";
              } else {
                return person.name + ", ";
              }
            })}
          </p>
          <h3>Director</h3>
          <p>
            {single_record["directorInfo"].map((director, i, row) => {
              if (i + 1 === row.length) {
                return director.name + ".";
              } else {
                return director.name + ", ";
              }
            })}
          </p>
          <h3>Release date</h3>
          <p>{release_date ? release_date : first_air_date}</p>
          <h2>More from director</h2>
        </section>
        <section className="logo">
          <a href="https://www.themoviedb.org/" target="_blank">
            <img src={apiLogo} className="api-logo" />
          </a>
        </section>

        <section className="director-reco">
          <h2>More from director</h2>
          {single_record["directorRecords"].map((directorRecord) => {
            return (
              <Link
                key={directorRecord.id}
                to={`/${directorRecord.media_type}/${directorRecord.id}`}
                onClick={() =>
                  changeMovie(directorRecord.media_type, directorRecord.id)
                }
              >
                <div
                  className="reco-poster"
                  style={{
                    backgroundImage: `url(${createBgImg(
                      poster,
                      directorRecord.poster_path
                    )}) `,
                  }}
                ></div>
              </Link>
            );
          })}
        </section>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <section className="movie-poster">
        <h1>{title}</h1>
        <div
          className="poster"
          style={{
            backgroundImage: `url(${createBgImg(poster, poster_path)})`,
          }}
        ></div>
      </section>
      <section className="movie-details">
        <h2>Description</h2>
        <p>{description}</p>
        <h3>Cast</h3>
        <p>
          {single_record["cast"].map((person, i, row) => {
            if (i + 1 === row.length) {
              return person.name + ".";
            } else {
              return person.name + ",";
            }
          })}
        </p>

        <h3>Release date</h3>
        <p>{release_date ? release_date : first_air_date}</p>
      </section>
      <section className="logo">
        <a href="https://www.themoviedb.org/" target="_blank">
          <img src={apiLogo} className="api-logo" />
        </a>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.9fr) minmax(0, 1fr);
  grid-gap: 10px;
  grid-row-gap: 30px;

  .single-movie-container {
    display: grid;
    grid-template-rows: auto auto;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  .movie-poster {
    width: fit-content;
    padding: 0rem 2rem 0rem 0rem;
    margin-left: auto;
  }

  .movie-details {
    grid-column-start: 2;
    grid-column-end: 3;
  }

  .movie-details h2 {
    display: none;
  }

  .logo {
    grid-column-start: 3;
  }

  .poster {
    height: 400px;
    width: 300px;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
    grid-column: 2/3;
  }

  .director-reco {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 1/-1;
    grid-row-start: 2;
  }

  .reco-poster {
    height: 300px;
    width: 200px;
    background-color: white;
    margin: 1rem;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    border-radius: 20px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 1300px) {
    width: 1000px;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.9fr);
    .logo {
      display: none;
    }
    .movie-poster {
      min-width: 100%;
    }
    .movie-details {
      padding-left: 20px;
    }
  }

  @media screen and (max-width: 1050px) {
    width: 800px;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.9fr);
    .movie-poster {
      min-width: 100%;
    }
    .movie-details {
      padding-left: 20px;
    }
    .movie-details h2 {
      display: initial;
      grid-column: 1/-1;
    }
    .director-reco h2 {
      display: none;
    }
    .reco-poster {
      height: 240px;
      width: 180px;
    }
  }
`;

export default SingleRecordPage;
