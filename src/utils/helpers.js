import samplePoster from "../assets/sample-poster.png";

export const formatInput = (input) => {
  return input.trim().split(" ").join(" ");
};

export const formatDate = (date) => {
  return date.split("").reverse().join("");
};

export const createBgImg = (url, path) => {
  if (path !== null && path !== undefined) {
    return url + path;
  }
  return samplePoster;
};
