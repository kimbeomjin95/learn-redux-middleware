// effects: 리덕스 사가 미들웨어가 수행하도록 작업을 명령하는 것
import {
  delay,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';

// action type 선언
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

// action 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

// saga 작성(제너레이터 함수를 사용해서 선언)
function* increaseSaga() {
  // 리덕스 미들웨어에게 특정 작업을 하기 명령하기 위해서는 effects(delay)를 yield 하면 됨
  yield delay(1000); // delay: 몇초동한 기다리는 것
  yield put(increase()); // put: 특정 액션을 디스패치 할 것
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

// 어떤 액션이 디스패치 되었을 때 어떤 작업을 수행할지 정의
export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // takeEvery: 특정 액션 타입에 대하여 디스패치되는 모든 액션들을 처리하는 것
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // takeLatest: 특정 액션 타입에 대하여 디스패치된 가장 마지막 액션만을 처리하는 함수
  // takeLeading: 가장 먼저 요청이 들어온 것만 처리(사전에 실행된 것이 있으면 무시 됌)
}

// 초기값
const initialState = 0;

// reducer
export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
