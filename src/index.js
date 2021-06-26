import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 프로젝트에 redux 적용
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; // applyMiddleware: 미들웨어 적용
import rootReducer from './modules';
import myLogger from './middlewares/myLogger';

// 스토어 생성(스토어는 하나의 리듀서만 받을 수 있음)
const store = createStore(rootReducer, applyMiddleware(myLogger));

ReactDOM.render(
  // 프로젝트의 redux 적용 완료
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
reportWebVitals();
