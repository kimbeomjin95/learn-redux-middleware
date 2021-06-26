// action type 선언
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// action 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// Thunk함수
export const increaseAsync = () => dispatch => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000); // 1초뒤에 dispatch 하겠단 의미, 여기까지의 코드작성이 thunk함수(dispatch, getState를 받아오는 부분부터)
};

// thunk create(thunk 함수를 만들어주는)
// () => dispatch => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// };

export const decreaseAsync = () => dispatch => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000); // 1초뒤에 dispatch 하겠단 의미
};

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
