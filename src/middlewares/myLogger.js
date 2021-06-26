// 미들웨어 생성
// store: 리덕스 스토어 인스턴스이며, dispatch, getState, subscribe 내장함수를 포함함
const myLogger = store => next => action => {
  console.log(action); // 먼저 액션을 출력
  console.log('\tPrev', store.getState());

  // action을 다음 미들웨어로 전달, 만약 없다면 reducer에게 전달
  const result = next(action);
  // 액션이 리듀서에서 처리가 완료되고 나서  그 다음 상태값을 콘솔에 출력
  console.log('\tNext', store.getState());

  // 여기서 반환하는 값은 dispatch(action)의 결과물이 됨(기본: undefined)
  // 컨테이너에서 dispatch(increase())되었을 때의 리턴값이 middleware에서  return하는 result를 의미
  return result;
};

export default myLogger;
