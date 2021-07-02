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
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'; // react-router 설치할 때 자동으로 딸려옴

const customHistory = createBrowserHistory();

// 스토어 생성(스토어는 하나의 리듀서만 받을 수 있음)
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ history: customHistory }), //  withExtraArgument: thunk함수에서 사전에 정해준 값들을 참조 할 수 있음 
      logger,
    ),
  ), // redux 개발자도구 적용, // logger와 다른 미들웨어를 사용한다면 logger가 뒤쪽으로
);

ReactDOM.render(
  // 프로젝트의 redux 적용 완료
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
reportWebVitals();
