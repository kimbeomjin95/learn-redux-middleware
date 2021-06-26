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

// type: 요청이 시작했음을 알리는 type(GET_POSTS, GET_POST)
// promiseCreate: 특정 파라미터를 가져와서 프로미스를 만들어주는 함수(postsAPI.getPosts())
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]; // 배열 비구조화 할당

  // thunk 함수 반환
  const thunkCreator = param => async dispatch => {
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

  return thunkCreator;
};

// createPromiseThunk(type)과 동일
// key: 각 action들마다 관리하는 key가 다름, payload.posts, payload.post
// handleAsyncActoins: 3가지 액션들에 대한 reducer를 만들어서 반환
export const handleAsyncActoins = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]; // 배열 비구조화 할당

  // reducer
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading, // [key]: [post, posts]
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
