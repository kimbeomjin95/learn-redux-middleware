import * as postsAPI from '../api/post';
import {
  createPromiseThunk,
  createPromiseThunkById,
  handleAsyncActoins,
  handleAsyncActoinsById,
  reducerUtils,
} from '../lib/asyncUtils';

//  API를 요청하기 위해선 액션을 생성해야 함(요청 하나당 액션3개씩)
const GET_POSTS = 'GET_POSTS'; // 특정 요청이 시작됐다 라는 의미
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 포스트 비우기
const CELAR_POST = 'CELAR_POST';

// 액션 생성 함수를 만들지 않고 thunk에서 직접 dispatch 할 수 있음
// createPromiseThunk 생성 함수
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);

// post 데이터 상태구조 변경을 위한 thunk함수 생성(getPost를 위한 thunk함수 생성완료)
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);
export const clearPost = () => ({ type: CELAR_POST });

// 초기값
const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

// handleAsyncActoins(유틸함수)
// 유틸함수를 만들어야 하는 이유는 리액트와 리덕스를 사용하여 api연동을 하는 경우에 
// 비슷한 코드를 자주 작성하게 될 것이기 때문임
const getPostsReducer = handleAsyncActoins(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncActoinsById(GET_POST, 'post', true);

// handleAsyncActoins reducer
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action); // 3개의 action중 하나라면 return 문 실행
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    case CELAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      };
    default:
      return state;
  }
}
