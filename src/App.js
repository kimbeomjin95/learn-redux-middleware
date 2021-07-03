import './App.css';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import CounterContainer from './containers/CounterContainer';

function App() {
  return (
    <>
      <CounterContainer />
      <Route path="/" component={PostListPage} exact />
      {/* exact는 이하 경로를 중복 출력하지 않도록한다 */}
      <Route path="/:id" component={PostPage} />
    </>
  );
}

export default App;
