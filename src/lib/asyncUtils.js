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
