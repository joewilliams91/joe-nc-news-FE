import axios from "axios";

const baseURL = "https://joe-nc-news.herokuapp.com/api/";

export const getData = url => {
    return axios.get(`${baseURL}${url}`).then(({data}) => {
        return data;
    })
}

export const addData = (url, body) => {
    return axios.post(`${baseURL}${url}`, body).then(({data}) => {
        return data;
    })
}