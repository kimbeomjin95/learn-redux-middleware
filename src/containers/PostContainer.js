import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { reducerUtils } from '../lib/asyncUtils';
import { clearPost, getPost, goToHome } from '../modules/posts';

function PostContainer({ postId }) {
  // postId: 라우터 파라미터를 통해 받아 올 것

  // 비구조화 할당하는 과정에서 최초로 렌더링될 때 state.posts.post[postId] 값이 존재하지 않을 때를 위한 오류 방지
  const { data, loading, error } = useSelector(
    state => state.posts.post[postId] || reducerUtils.initial(),
  );
  const dispatch = useDispatch();

  // 컴포넌트가 처음 렌더링될 때 thunk생성함수(getPost )를 사용하기 위해서 useEffect를 사용
  useEffect(() => {
    // 데이터가 이미 있다면 요청조차 하지 않기 위함
    if (data) return;
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  // 결과에 따라 다른 화면
  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈으로</button>
      <Post post={data} />
    </>
  );
}

export default PostContainer;
