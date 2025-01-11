import axios from "axios";
//create that must return a promise
const BASE_URL = "http://localhost:3000/api/v1/posts";
//!Create Post API
export const createPostAPI = async (postData) => {
  console.log(postData);
  const response = await axios.post(`${BASE_URL}/create`, {
    title: postData.title,
    description: postData.description,
  });
  return response.data;
};
//!Fetch All posts
export const fetchAllPosts = async () => {
  const posts = await axios.get(`${BASE_URL}`);
  return posts.data;
};
