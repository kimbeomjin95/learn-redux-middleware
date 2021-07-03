import { call, put } from 'redux-saga/effects';

// 초기상태를 선언하는 부분과 각 액션타입에 대하여 업데이트 하는 로직을 좀더 편리할 수 사용할 수 있게끔 생성
export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: false,
    error: null,
  }),
  // 함수설정(기존 상태를 유지하고 단순히 로딩값만 변경하기 위함)
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: data => ({
    data,
    loading: false,
    error: null,
  }),
  error: error => ({
    data: null,
    loading: false,
    error,
  }),
};

// saga posts 유틸 함수
// promiseCreator: 프로미스를 만들어주는 함수
export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]; // 배열 비구조화 할당
  return function* saga(action) {
    // action: api를 요청할 때 파라미터를 필요로 할 수 있기 때문
    console.log('createPromiseSaga, ' + action.payload);
    try {
      const result = yield call(promiseCreator, action.payload);
      // 성공
      yield put({
        type: SUCCESS,
        payload: result,
      });
    } catch (e) {
      // 실패
      yield put({
        type: ERROR,
        payload: e,
        error: true,
      });
    }
  };
};

// saga postById 유틸 함수
export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]; // 배열 비구조화 할당
  return function* saga(action) {
    // action: api를 요청할 때 파라미터를 필요로 할 수 있기 때문
    const id = action.meta;
    console.log('createPromiseSagaById, ' + id);
    try {
      const result = yield call(promiseCreator, action.payload);
      // 성공
      yield put({
        type: SUCCESS,
        payload: result,
        meta: id,
      });
    } catch (e) {
      // 실패
      yield put({
        type: ERROR,
        payload: e,
        error: true,
        meta: id,
      });
    }
  };
};

// type: 요청이 시작했음을 알리는 type(GET_POSTS, GET_POST)
// promiseCreate: 특정 파라미터를 가져와서 프로미스를 만들어주는 함수(postsAPI.getPosts())
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]; // 배열 비구조화 할당

  // thunk 함수 반환
  return param => async dispatch => {
    // 로딩시
    dispatch({ type });
    try {
      // payload: posts, post의 이름을 payload로 통합
      const payload = await promiseCreator(param);
      // 성공시
      dispatch({
        type: SUCCESS,
        payload,
      });
    } catch (e) {
      // 실패시
      dispatch({
        type: ERROR,
        payload: e,
        error: true, // FSA 규칙
      });
    }
  };
};

// 파라미터 자체가 ID의 의미
const defaultIdSelector = param => param;

// idSelector: API를 호출할 때 사용하는 파라미터에서 ID를 어떻게 선택할지 정의해주는 함수
export const createPromiseThunkById = (
  type,
  promiseCreator,
  idSelector = defaultIdSelector,
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]; // 배열 비구조화 할당

  // thunk 함수 반환
  return param => async dispatch => {
    const id = idSelector(param);

    // 로딩시
    dispatch({ type, meta: id });
    try {
      // payload: posts, post의 이름을 payload로 통합
      const payload = await promiseCreator(param);
      // 성공시
      dispatch({
        type: SUCCESS,
        payload,
        meta: id,
      });
    } catch (e) {
      // 실패시
      dispatch({
        type: ERROR,
        payload: e,
        error: true, // FSA 규칙
        meta: id,
      });
    }
  };
};

// createPromiseThunk(type)과 동일
// key: 각 action들마다 관리하는 key가 다름, payload.posts, payload.post
// handleAsyncActoins: 3가지 액션들에 대한 reducer를 만들어서 반환
export const handleAsyncActoins = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]; // 배열 비구조화 할당

  // reducer
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          // [key]: [post, posts]
          [key]: reducerUtils.loading(keepData ? state[key].data : null), // true시 기존 상태를 유지하겠단 의미
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload), // payload: [posts, post]
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};

// action meta값의 id를 참조해서 상태를 업데이트
// handleAsyncActoinsById: action.meta값을 참고해서 [key]값을 바로 업데이트 하는 것이 아니라
// [key]안에 있는 id객체를 업데이트 하는 것
export const handleAsyncActoinsById = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]; // 배열 비구조화 할당

  // reducer
  return (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          // [key]: [post, posts]
          [key]: {
            ...state[key],
            // state[key][id]가 undefined인 경우 에러방지
            [id]: reducerUtils.loading(
              keepData ? state[key][id] && state[key][id].data : null,
            ), // keepData: true시 로딩중에도 데이터를 초기화하지 않겠다란 의미(기존 데이터 재사용)
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload), // payload: [posts, post]
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload), // payload: [posts, post]
          },
        };
      default:
        return state;
    }
  };
};
