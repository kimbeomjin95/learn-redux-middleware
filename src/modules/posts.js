import { takeEvery } from 'redux-saga/effects';
import * as postsAPI from '../api/posts';
import {
  createPromiseSaga,
  createPromiseSagaById,
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

// saga를 위한 액션 순수함수 생성
export const getPosts = () => ({
  type: GET_POSTS,
});
export const getPost = id => ({
  type: GET_POST,
  payload: id, // payload: 사가에서 api를 호출할 때 id값을 param으로 사용하기 위함
  meta: id, // meta: 리듀서에서 처리할 때 사용하는 용도
});

// function* getPostsSaga() {
//   try {
//     const posts = yield call(postsAPI.getPosts); // call: 특정 함수 호출, postsAPI.getPosts가 호출되면 promise가 반환됨
//     yield put({
//       // put: 특정 액션을 디스패치 할 것
//       type: GET_POSTS_SUCCESS,
//       payload: posts,
//     });
//   } catch (e) {
//     yield put({
//       // put: 특정 액션을 디스패치 할 것
//       type: GET_POSTS_ERROR,
//       payload: e,
//       error: true,
//     });
//   }
// }

// function* getPostSaga(action) {
//   // action: saga 함수에서 action정보를 보는 법
//   const id = action.payload;
//   try {
//     const post = yield call(postsAPI.getPostById, id);
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post,
//       meta: id,
//     });
//   } catch (e) {
//     yield put({
//       type: GET_POST_ERROR,
//       payload: e,
//       error: true,
//       meta: id,
//     });
//   }
// }

// saga 유틸함수
const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

// 사가를 모니터링하는 함수
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

export const goToHome =
  () =>
  (dispatch, getState, { history }) => {
    // extra.history를 비구조화 할당
    history.push('/'); // 홈으로 이동
  };

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
