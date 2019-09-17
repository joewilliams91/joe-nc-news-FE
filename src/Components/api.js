import axios from "axios";

const request = axios.create({
  baseURL: "https://joe-nc-news.herokuapp.com/api/"
});

export const getArticles = async params => {
  const { data } = await request.get("articles", params);
  return data;
};

export const getUser = async (username) => {
  const { data } = await request.get(`users/${username}`);
  return data;
}

export const getTopics = async () => {
  const { data } = await request.get('topics');
  return data;
}

export const getArticle = async article_id => {
  const { data } = await request.get(`articles/${article_id}`);
  return data;
};

export const getComments = async (article_id, params) => {
  const { data } = await request.get(`articles/${article_id}/comments`, params);
  return data;
};

export const deleteComment = async comment_id => {
  const { data } = await request.delete(`comments/${comment_id}`);
  return data;
};

export const addComment = async (article_id, body) => {
  const { data } = await request.post(`articles/${article_id}/comments`, body);
  return data;
};

export const patchArticle = async (article_id, body) => {
  const { data } = await request.patch(`articles/${article_id}`, body);
  return data;
};

export const patchComment = async (comment_id, body) => {
  const { data } = await request.patch(`comments/${comment_id}`, body);
  return data;
};

export const patchData = async (url, body) => {
  const { data } = await request.patch(`${url}`, body);
  return data;
};
