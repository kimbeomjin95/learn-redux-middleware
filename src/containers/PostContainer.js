import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { getPost } from '../modules/posts';

function PostContainer({ postId }) {
  // postId: 라우터 파라미터를 통해 받는

  const { data, loading, error } = useSelector(state => state.posts.post);
  const dispatch = useDispatch();

  // 컴포넌트가 처음 렌더링될 때 thunk생성함수(getPost )를 사용하기 위해서 useEffect를 사용
  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  // 결과에 따라 다른 화면
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <Post post={data} />;
}

export default PostContainer;
