import axios from "axios";

export const login = (credentials) => {
  axios
    .post("/auth/login", { ...credentials })
    .then((response) => {
      console.log(response.data);
      // setUser(response.data);
    })
    .catch((err) => console.log(err));
};

export const getTemplate = (name) => {
  return axios
    .get(`/api/template/${name}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getFeed = (feedName) => {
  return axios
    .get(`/api/feeds/${feedName}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
