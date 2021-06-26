import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 프로젝트에 redux 적용
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; // applyMiddleware: 미들웨어 적용
import rootReducer from './modules';
import logger from 'redux-logger'; // myLogger를 redux-logger로 대체
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

// 스토어 생성(스토어는 하나의 리듀서만 받을 수 있음)
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger)), // redux 개발자도구 적용, // logger와 다른 미들웨어를 사용한다면 logger가 뒤쪽으로
);

ReactDOM.render(
  // 프로젝트의 redux 적용 완료
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
reportWebVitals();
