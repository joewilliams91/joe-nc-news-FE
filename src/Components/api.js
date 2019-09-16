import axios from "axios";

const request = axios.create({
  baseURL: "https://joe-nc-news.herokuapp.com/api/"
});

export const getData = async (url, params) => {
  const { data } = await request.get(`${url}`, params);
  return data;
};

export const addData = async (url, body) => {
  const { data } = await request.post(`${url}`, body);
  return data;
};

export const removeData = async (url) => {
  const {data} = await request.delete(url)
  return data;
}
