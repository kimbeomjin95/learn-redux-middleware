import { ids } from 'webpack';
import * as postsAPI from '../api/post';

//  API를 요청하기 위해선 액션을 생성해야 함(요청 하나당 액션3개씩)
const GET_POSTS = 'GET_POSTS'; // 특정 요청이 시작됐다 라는 의미
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 액션 생성 함수를 만들지 않고 thunk에서 직접 dispatch 할 수 있음
// thunk 생성 함수
export const getPosts = () => async dispatch => {  // 이 thunk가 호출될 때는 파라미터는 받지 않고 dispatch를 파라미터로 받아와서 내부에서 작업을 실행
  // 요청이 시작됨
  dispatch({ type: GET_POSTS });

  // API 호출
  try {
    const posts = await postsAPI.getPosts();

    // 성공 했을 때
    dispatch({ type: GET_POSTS_SUCCESS, posts });
  } catch (e) {
    // 실패 했을 때
    dispatch({
      type: GET_POSTS_ERROR,
      error: e,
    });
  }
};

export const getPost = id => async dispatch => {
  // 요청이 시작됨
  dispatch({ type: GET_POST });

  // API 호출
  try {
    const post = await postsAPI.getPost(id);

    // 성공 했을 때
    dispatch({ type: GET_POST_SUCCESS, post });
  } catch (e) {
    // 실패 했을 때
    dispatch({
      type: GET_POST_ERROR,
      error: e,
    });
  }
};
