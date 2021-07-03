import axios from 'axios';

// 가짜 API 함수
export const getPosts = async () => {
  const response = await axios.get('/posts'); // axios를 사용할 때 도메인을 지우면 현재 react-application이 띄어져 있는 주소의 도메인을 사용
  return response.data;
};

export const getPostById = async id => {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
};
