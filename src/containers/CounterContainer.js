import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from '../components/Counter';
import { decreaseAsync, increaseAsync } from '../modules/counter';

// store로 부터 props 를 받아옴
function CounterContainer() {
  // useSelector: 스토어의 상태를 조회 할 땐 만약 상태가 바뀌지 않았으면 리렌더링하지 않음
  const number = useSelector(state => state.counter); // reducer의 이름이 counter이므로(counter값이 숫자이므로, 초기값이 숫자이므로)
  const dispatch = useDispatch();

  const onIncrease = () => dispatch(increaseAsync()); // 액션 만들고 dispatch
  const onDecrease = () => dispatch(decreaseAsync());

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}

export default CounterContainer;
