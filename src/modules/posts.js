import * as postsAPI from '../api/post';
import {
  createPromiseThunk,
  handleAsyncActoins,
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
export const getPost = id => async dispatch => {
  dispatch({ type: GET_POST, meta: id }); //요 meta값에 id를 전달해주면 reducer에서 id를 참고해서 상태를 udpate 함
  try {
    const payload = await postsAPI.getPostById(id); // payload: posts, post의 이름을 payload로 통합
    dispatch({ type: GET_POST_SUCCESS, payload, meta: id }); // API 청이 성공했다는걸 의미하는 dispatch
  } catch (e) {
    dispatch({
      type: GET_POST_ERROR,
      payload: e,
      error: true,
      meta: id,
    });
  }
};
export const clearPost = () => ({ type: CELAR_POST });

// 초기값
const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

// handleAsyncActoins
const getPostsReducer = handleAsyncActoins(GET_POSTS, 'posts', true);

// 직접 reducer 작성
const getPostReducer = (state, action) => {
  const id = action.meta;
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: {
          ...state.post,
          // 특정 아이디(key)를 사용해서 로딩중 상태 만들기
          // 기존의 불러온 상태가 있다면 그 상태를 재사용하기 위함(로딩중에 데이터 유지)
          // 최초 특정 포스트를 불러올때 state.post[id]값이 undefined이므로 data를 조회하면 에러가 발생하므로 이를 방지하기 위해 조건 추가
          [id]: reducerUtils.loading(state.post[id] && state.post[id].data),
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          // 특정 아이디(key)를 사용해서 로딩중 상태 만들기
          // 기존의 불러온 상태가 있다면 그 상태를 재사용하기 위함(로딩중에 데이터 유지)
          // 최초 특정 포스트를 불러올때 state.post[id]값이 undefined이므로 data를 조회하면 에러가 발생하므로 이를 방지하기 위해 조건 추가
          [id]: reducerUtils.loading(action.payload),
        },
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.error(action.payload),
        },
      };
    default:
  }
};

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
