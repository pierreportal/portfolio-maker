import axios from "axios";

export const getUser = () => {
  return axios
    .get("/api/user")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const login = (credentials) => {
  axios
    .post("/auth/login", { ...credentials })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};

export const getAllTemplates = () => {
  return axios
    .get(`/api/templates`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
export const getAllFeeds = () => {
  return axios
    .get(`/api/feeds`)
    .then((res) => res.data)
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

export const getSettings = () => {
  return axios
    .get(`/api/settings`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
